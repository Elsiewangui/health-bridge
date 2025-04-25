const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();
const jwt = require("jsonwebtoken");


const app = express();

//Middleware
app.use(cors());
app.use(express.json()); //Parses JSON request bodies

//File paths
const filePath = path.join(__dirname, 'clients.json');
const programsPath = path.join(__dirname, 'programs.json');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


//======================= LOGIN =======================


const doctors = [
  { email: "doctor@example.com", password: "1234" },
];

//POST /login
app.post("/login",(req, res) => {
  const { email, password } = req.body;

  const doctor = doctors.find(
    (doc) => doc.email === email && doc.password === password
  );

  if (doctor) {
    //Generate token if login is successful
    const token = jwt.sign(
      { email: doctor.email },//payload
      process.env.SECRET_KEY,//secret key
      { expiresIn: "1h" }//token expires in 1 hour
    );

    //Send token to frontend
    res.json({ success: true, message: "Login successful", token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

function loadClients() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function saveClients(clients) {
  fs.writeFileSync(filePath, JSON.stringify(clients, null, 2));
}



function getPrograms() {
  const data = fs.readFileSync(programsPath, 'utf-8');
  return JSON.parse(data);
}

function savePrograms(programs) {
  fs.writeFileSync(programsPath, JSON.stringify(programs, null, 2));
}

//======================= CLIENT ROUTES =======================

app.get('/clients', (req, res) => {
  const clients = loadClients();
  res.json(clients);
});

app.get('/clients/:id', (req, res) => {
  const clients = loadClients();
  const id = Number(req.params.id);
  const client = clients.find(c => c.id === id);
  if (!client) return res.status(404).send("Client not found");
  res.json(client);
});

app.post('/clients', (req, res) => {
  const clients = loadClients();
  const newClient = {
    id: Date.now(),
    ...req.body,
  };
  clients.push(newClient);
  saveClients(clients);
  res.status(201).json(newClient);
});

app.put('/clients/:id', (req, res) => {
  const clients = loadClients();
  const id = Number(req.params.id);
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).send("Client not found");
  clients[index] = { ...clients[index], ...req.body };
  saveClients(clients);
  res.json(clients[index]);
});

app.delete('/clients/:id',(req, res) => {
  let clients = loadClients();
  const id = Number(req.params.id);
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).send("Client not found");
  const removed = clients.splice(index, 1);
  saveClients(clients);
  res.json({ message: "Client deleted", client: removed[0] });
});

//======================= PROGRAM ROUTES =======================

app.get('/programs', (req, res) => {
  const programs = getPrograms();
  res.json(programs);
});

app.post('/programs', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Program name and description are required" });
  }

  const programs = getPrograms();
  const newProgram = {
    id: programs.length + 1,
    name,
    description,
  };

  programs.push(newProgram);
  savePrograms(programs);

  res.status(201).json({
    message: 'Program created successfully',
    program: newProgram,
  });
});

//======================= SERVER START =======================

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
