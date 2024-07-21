const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_LOCALHOST = process.env.MONGO_LOCALHOST;
const UI_PORT = process.env.UI_PORT || 5173;

app.use(cors({
  origin: `https://notesapp-frontend-e0a1.onrender.com/`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`DB Connected at ${PORT}`);
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`DB Connection Error: ${err.message}`);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userId: { type: String, default: () => new ObjectId() }
});

const noteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const noteModel = mongoose.model("notes", noteSchema);

const userModel = mongoose.model("users", userSchema);

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received request to /signup with data:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: newUser.userId });
  } catch (err) {
    console.error(`Error registering user: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(`Error logging in user: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    console.log("Invoked /getUsers");
    const userData = await userModel.find();
    console.log(userData);
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notes endpoints
app.get("/notes/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notes = await noteModel.find({ userId: new ObjectId(userId) });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Endpoint to add a note
app.post("/notes", async (req, res) => {
  const { title, description, body } = req.body;
  const userId = req.headers['user-id']; // Assuming user ID is sent in headers
  console.log("LoggedIn userId "+userId);

  if (!userId || !title || !description || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newNote = new noteModel({ userId, title, description, body });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error(`Error adding note: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, body } = req.body;
  try {
    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { title, description, body },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getUsers/:userId', async (req, res) => {

  const  userId  = req.params.userId;
  console.log("loggedIn userId : "+userId);
  try {
    const user = await userModel.findOne({userId});
    console.log("Fetched data : "+ user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
