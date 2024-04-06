// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
// replace mongo-container with 0.0.0.0 when running locally
mongoose.connect('mongodb://mongo-container:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a schema and model
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Todo = mongoose.model('Todo', todoSchema);

// Middleware to parse JSON bodies
app.use(express.json());


app.get('', async(req, res) => {
  res.json("hello worlds")
})

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo(req.body);
    console.log("here  is is the request ", req.body)
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
