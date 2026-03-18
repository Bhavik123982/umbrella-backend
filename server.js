const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for your Netlify frontend
app.use(cors());
app.use(express.json());

const people = ["manager", "friend", "teacher", "company", "neighbor"];
const tones = ["formal", "semi-formal", "informal"];
const topics = ["work schedule", "product issue", "invitation", "delay", "service"];

function generateTask1(level) {
  let complexity = level === "hard" ? "detailed" : level === "medium" ? "clear" : "basic";
  return `Write a ${tones[Math.floor(Math.random()*tones.length)]} email to your ${
    people[Math.floor(Math.random()*people.length)]
  } about a ${topics[Math.floor(Math.random()*topics.length)]}. Provide ${complexity} info.`;
}

function generateTask2(level) {
  let questions = ["Work from home?", "Technology?", "Free transport?", "Social media?"];
  return `Respond to: "${questions[Math.floor(Math.random()*questions.length)]}" (${level} level).`;
}

// Root route (Crucial for Render health checks)
app.get("/", (req, res) => {
  res.status(200).send("Umbrella Backend is LIVE and Running!");
});

// API Routes
app.get("/task1/:level", (req, res) => {
  res.json({ prompt: generateTask1(req.params.level) });
});

app.get("/task2/:level", (req, res) => {
  res.json({ prompt: generateTask2(req.params.level) });
});

// Render Dynamic Port Fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
