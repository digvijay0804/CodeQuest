const mongoose = require('mongoose');
const dotenv = require('dotenv');
const StoryQuestion = require('../models/storyQuestion');

// Load .env variables
dotenv.config({ path: "../.env" });

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in the .env file");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

const questions = [
  {
    title: "Inventory Restock Alert",
    description: "You manage a warehouse. Given a list of product stock levels and a threshold, identify which items need restocking (stock < threshold).",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "5\n10 5 8 3 15\n6",
    sampleOutput: "2 4",
    testCases: [
      { input: "5\n10 5 8 3 15\n6", expectedOutput: "2 4" },
      { input: "4\n1 2 3 4\n5", expectedOutput: "0 1 2 3" },
      { input: "3\n10 12 15\n5", expectedOutput: "" }
    ],
    points: 25,
    level: "hard"
  },
  {
    title: "Bus Stop Timetable",
    description: "You are given the arrival times of buses and your arrival time. Write a program to find the next available bus (i.e., first bus ≥ your time).",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "5\n10 20 30 40 50\n25",
    sampleOutput: "30",
    testCases: [
      { input: "5\n10 20 30 40 50\n25", expectedOutput: "30" },
      { input: "4\n8 9 10 12\n11", expectedOutput: "12" },
      { input: "3\n5 6 7\n8", expectedOutput: "-1" }
    ],
    points: 30,
    level: "hard"
  },
  {
    title: "Festival Budget Planner",
    description: "Given daily expenses over `n` days and a budget, write a program to check whether you'll exceed the budget.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "4\n100 200 150 100\n600",
    sampleOutput: "No",
    testCases: [
      { input: "4\n100 200 150 100\n600", expectedOutput: "No" },
      { input: "5\n50 60 70 80 90\n300", expectedOutput: "Yes" },
      { input: "3\n100 200 100\n400", expectedOutput: "No" }
    ],
    points: 25,
    level: "hard"
  },
  {
    title: "Battery Drain Simulation",
    description: "You have a device that drains `d` units of battery per hour. Given initial battery level and usage hours, simulate if the device shuts down.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "80 10 7",
    sampleOutput: "Yes",
    testCases: [
      { input: "80 10 7", expectedOutput: "Yes" },
      { input: "50 5 12", expectedOutput: "No" },
      { input: "100 10 10", expectedOutput: "Yes" }
    ],
    points: 30,
    level: "hard"
  },
  {
    title: "Emergency Room Prioritization",
    description: "Given a list of patients with severity scores, sort them in descending order of priority for treatment.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "3\nJohn 5\nMary 9\nAlice 7",
    sampleOutput: "Mary Alice John",
    testCases: [
      { input: "3\nJohn 5\nMary 9\nAlice 7", expectedOutput: "Mary Alice John" },
      { input: "2\nA 10\nB 20", expectedOutput: "B A" },
      { input: "1\nZoe 15", expectedOutput: "Zoe" }
    ],
    points: 35,
    level: "hard"
  },
  {
    title: "Multi-city Trip Optimizer",
    description: "Given distances between cities, find the shortest city-to-city travel plan visiting all cities once (TSP-style, approximate).",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "3\n0 10 15\n10 0 20\n15 20 0",
    sampleOutput: "45",
    testCases: [
      { input: "3\n0 10 15\n10 0 20\n15 20 0", expectedOutput: "45" },
      { input: "2\n0 5\n5 0", expectedOutput: "10" },
      { input: "4\n0 1 2 3\n1 0 4 5\n2 4 0 6\n3 5 6 0", expectedOutput: "12" }
    ],
    points: 40,
    level: "hard"
  },
  {
    title: "Smartwatch Sleep Analyzer",
    description: "Given a list of sleep durations (in hours) for a month, determine average, min, and max sleep values.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "5\n7.5 6.0 8.0 5.5 7.0",
    sampleOutput: "Average: 6.8, Min: 5.5, Max: 8.0",
    testCases: [
      { input: "5\n7.5 6.0 8.0 5.5 7.0", expectedOutput: "Average: 6.8, Min: 5.5, Max: 8.0" },
      { input: "3\n6.0 6.0 6.0", expectedOutput: "Average: 6.0, Min: 6.0, Max: 6.0" },
      { input: "2\n4.0 9.0", expectedOutput: "Average: 6.5, Min: 4.0, Max: 9.0" }
    ],
    points: 35,
    level: "hard"
  },
  {
    title: "E-commerce Discount System",
    description: "Based on user's cart total and coupon codes, apply the best possible discount and return final payable amount.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "500\n2\nSAVE10 10\nSAVE50 50",
    sampleOutput: "450",
    testCases: [
      { input: "500\n2\nSAVE10 10\nSAVE50 50", expectedOutput: "450" },
      { input: "300\n1\nSAVE100 100", expectedOutput: "200" },
      { input: "100\n0", expectedOutput: "100" }
    ],
    points: 30,
    level: "hard"
  },
  {
    title: "Flight Price Tracker",
    description: "Given historical prices of flights, identify the lowest price and on which day it occurred.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "5\n320 310 290 300 280",
    sampleOutput: "280 4",
    testCases: [
      { input: "5\n320 310 290 300 280", expectedOutput: "280 4" },
      { input: "3\n500 450 600", expectedOutput: "450 1" },
      { input: "4\n100 100 100 100", expectedOutput: "100 0" }
    ],
    points: 25,
    level: "hard"
  },
  {
    title: "Monthly Expense Splitter",
    description: "You and your roommates split rent and utility bills. Given the total and individual contributions, determine who owes or is owed money.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "3\n1000 1200 800",
    sampleOutput: "Person 1 owes 200\nPerson 2 is owed 0\nPerson 3 owes 400",
    testCases: [
      { input: "3\n1000 1200 800", expectedOutput: "Person 1 owes 200\nPerson 2 is owed 0\nPerson 3 owes 400" },
      { input: "2\n1000 1000", expectedOutput: "Person 1 is owed 0\nPerson 2 is owed 0" },
      { input: "4\n900 1000 1100 1000", expectedOutput: "Person 1 owes 150\nPerson 2 owes 50\nPerson 3 is owed 50\nPerson 4 owes 50" }
    ],
    points: 40,
    level: "hard"
  }
];

const seedDB = async () => {
  try {
    await StoryQuestion.insertMany(questions);
    console.log("✅ Hard Level Questions Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error while seeding hard questions:", err);
    process.exit(1);
  }
};

seedDB();
