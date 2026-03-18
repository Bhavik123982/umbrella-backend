const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS so your Netlify site can talk to this backend
app.use(cors());
app.use(express.json());

const people = ["manager", "friend", "teacher", "company", "neighbor"];
const tones = ["formal", "semi-formal", "informal"];
const topics = [
  "work schedule problem",
  "product issue",
  "event invitation",
  "travel delay",
  "service dissatisfaction"
];

function generateTask1(level) {
  let complexity = level === "hard" ? 3 : level === "medium" ? 2 : 1;
  return `Write a ${tones[Math.floor(Math.random()*tones.length)]} email to your ${
    people[Math.floor(Math.random()*people.length)]
  } regarding a ${topics[Math.floor(Math.random()*topics.length)]}. Include ${
    complexity === 3 ? "detailed explanation, solution, and tone control" :
    complexity === 2 ? "clear explanation and request" :
    "basic information"
  }.`;
}

function generateTask2(level) {
  let questions = [
    "Do you prefer working from home or office?",
    "Is technology making life easier?",
    "Should public transport be free?",
    "Is social media harmful?"
  ];
  return `Respond to the survey question: "${
    questions[Math.floor(Math.random()*questions.length)]
  }". Provide ${
    level === "hard" ? "detailed arguments, examples, and counterpoints" :
    level === "medium" ? "reasons and examples" :
    "simple opinion"
  }.`;
}

// FIX: Added a root route so you don't see "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Umbrella Academy API is online and ready!");
});

// Routes for the app
app.get("/task1/:level", (req, res) => {
  res.json({ prompt: generateTask1(req.params.level) });
});

app.get("/task2/:level", (req, res) => {
  res.json({ prompt: generateTask2(req.params.level) });
});

// Use the Port Render provides or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
