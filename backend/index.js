const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_LOCALHOST = process.env.MONGO_LOCALHOST;
const UI_PORT = process.env.UI_PORT || 5173;

app.use(cors({
  origin: `http://localhost:${UI_PORT}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/notesapp", { useNewUrlParser: true, useUnifiedTopology: true })
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
  password: String
});

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

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
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
      console.log(user);
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
    const userData = await userModel.findOne();
    console.log(userData);
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
