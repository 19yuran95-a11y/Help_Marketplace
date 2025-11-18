const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

// Health
app.get('/', (req, res) => {
  res.send('Help Marketplace backend — running');
});

// List tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Create task
app.post('/api/tasks', (req, res) => {
  const t = { id: tasks.length + 1, created_at: new Date().toISOString(), ...req.body };
  tasks.push(t);
  res.status(201).json(t);
});

// Simple auth stub (for testing)
app.post('/api/auth/register', (req, res) => {
  const { email, name } = req.body;
  res.json({ token: 'dev-token', user: { id: 1, email, name } });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ token: 'dev-token', user: { id: 1, email: req.body.email } });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server started on port', PORT));
