const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'clients.json');

// Load programs from programs.json
const getPrograms = () => {
  const data = fs.readFileSync('./programs.json', 'utf-8');
  return JSON.parse(data);
};

// Save programs to programs.json
const savePrograms = (programs) => {
  fs.writeFileSync('./programs.json', JSON.stringify(programs, null, 2));
};

// Load clients from clients.json
function loadClients() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Save clients to clients.json
function saveClients(clients) {
  fs.writeFileSync(filePath, JSON.stringify(clients, null, 2));
}

// GET all clients
app.get('/clients', (req, res) => {
  const clients = loadClients();
  res.json(clients);
});

// GET a single client by ID
app.get('/clients/:id', (req, res) => {
  const clients = loadClients();
  const id = Number(req.params.id); // Convert param to number
  const client = clients.find(c => c.id === id);
  if (!client) return res.status(404).send("Client not found");
  res.json(client);
});

// POST a new client
app.post('/clients', (req, res) => {
  const clients = loadClients();

  const newClient = {
    id: Date.now(), // Use timestamp as unique ID
    ...req.body
  };

  clients.push(newClient);
  saveClients(clients);
  res.status(201).json(newClient);
});

// PUT update a client by ID
app.put('/clients/:id', (req, res) => {
  const clients = loadClients();
  const id = Number(req.params.id); // Convert param to number
  const index = clients.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).send("Client not found");

  clients[index] = { ...clients[index], ...req.body };
  saveClients(clients);
  res.json(clients[index]);
});

// DELETE a client by ID
app.delete('/clients/:id', (req, res) => {
  let clients = loadClients();
  const id = Number(req.params.id); // Convert param to number
  const index = clients.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).send("Client not found");

  const removed = clients.splice(index, 1);
  saveClients(clients);
  res.json({ message: "Client deleted", client: removed[0] });
});

// GET all health programs
app.get('/programs', (req, res) => {
  const programs = getPrograms();
  res.json(programs);
});

// POST a new health program
app.post('/programs', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Program name and description are required" });
  }

  const programs = getPrograms();

  const newProgram = {
    id: programs.length + 1,
    name,
    description
  };

  programs.push(newProgram);
  savePrograms(programs);

  res.status(201).json({
    message: 'Program created successfully',
    program: newProgram
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
