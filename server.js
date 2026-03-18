const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

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

app.get("/task1/:level", (req, res) => {
  res.json({ prompt: generateTask1(req.params.level) });
});

app.get("/task2/:level", (req, res) => {
  res.json({ prompt: generateTask2(req.params.level) });
});

app.listen(3000, () => console.log("Server running on port 3000"));