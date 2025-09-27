const mongoose = require('mongoose');
const dotenv = require('dotenv');
const StoryQuestion = require('../models/storyQuestion');

// Load .env variables
dotenv.config({ path: "../.env" });

// Check if MONGO_URI is being loaded correctly
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in the .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Define seed data
const questions = [
  {
    title: "Birthday Candles",
    description: "It's your friend’s birthday and you bought a cake. You have `n` candles of different heights. You want to light only the tallest ones. Write a program to count how many tallest candles you have.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "4\n3 2 1 3",
    sampleOutput: "2",
    testCases: [
      { input: "4\n3 2 1 3", expectedOutput: "2" },
      { input: "5\n1 2 3 4 5", expectedOutput: "1" },
      { input: "6\n3 3 3 3 3 3", expectedOutput: "6" }
    ],
    points: 10,
    level: "easy"
  },
  {
    title: "Train Delay",
    description: "You’re at the station. The train is scheduled to arrive in `a` minutes and you’ve been waiting for `b` minutes. Calculate how much longer you'll have to wait.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "15 5",
    sampleOutput: "10",
    testCases: [
      { input: "15 5", expectedOutput: "10" },
      { input: "20 0", expectedOutput: "20" },
      { input: "5 5", expectedOutput: "0" }
    ],
    points: 5,
    level: "easy"
  },
  {
    title: "Café Billing",
    description: "You ordered `n` items at a café. Write a program to calculate the total bill. The cost of each item is given.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "3\n120 80 150",
    sampleOutput: "350",
    testCases: [
      { input: "3\n120 80 150", expectedOutput: "350" },
      { input: "2\n200 300", expectedOutput: "500" },
      { input: "4\n50 50 50 50", expectedOutput: "200" }
    ],
    points: 10,
    level: "easy"
  },
  {
    title: "Library Fine",
    description: "If a book is returned after the due date, a fine is charged. For each day late, the fine is 2 rupees. Calculate the total fine.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "10",
    sampleOutput: "20",
    testCases: [
      { input: "10", expectedOutput: "20" },
      { input: "0", expectedOutput: "0" },
      { input: "5", expectedOutput: "10" }
    ],
    points: 5,
    level: "easy"
  },
  {
    title: "Daily Steps Tracker",
    description: "You’re tracking your fitness. Write a program that takes in the number of steps walked over 7 days and outputs the total steps walked in the week.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "1000 1200 1100 1300 900 800 950",
    sampleOutput: "8250",
    testCases: [
      { input: "1000 1200 1100 1300 900 800 950", expectedOutput: "8250" },
      { input: "0 0 0 0 0 0 0", expectedOutput: "0" },
      { input: "500 500 500 500 500 500 500", expectedOutput: "3500" }
    ],
    points: 10,
    level: "easy"
  },
  {
    title: "Water Bottles for Trip",
    description: "You are planning a trip and need 2 liters of water per person. Given the number of people, calculate total water required.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "5",
    sampleOutput: "10",
    testCases: [
      { input: "5", expectedOutput: "10" },
      { input: "1", expectedOutput: "2" },
      { input: "0", expectedOutput: "0" }
    ],
    points: 5,
    level: "easy"
  },
  {
    title: "Elevator Capacity",
    description: "The maximum weight an elevator can carry is 500 kg. Given weights of 4 people, determine if the elevator is overloaded.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "120 130 110 140",
    sampleOutput: "No",
    testCases: [
      { input: "120 130 110 140", expectedOutput: "No" },
      { input: "150 150 150 100", expectedOutput: "Yes" },
      { input: "100 100 100 100", expectedOutput: "No" }
    ],
    points: 10,
    level: "easy"
  },
  {
    title: "Speed Fine",
    description: "You’re driving. The speed limit is 60 km/h. If your speed exceeds the limit, you're fined 100 rupees. Write a program to decide if you should be fined.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "70",
    sampleOutput: "Yes",
    testCases: [
      { input: "70", expectedOutput: "Yes" },
      { input: "60", expectedOutput: "No" },
      { input: "45", expectedOutput: "No" }
    ],
    points: 5,
    level: "easy"
  },
  {
    title: "Tea Party",
    description: "You are organizing a tea party. Each guest needs 2 biscuits. Given the number of guests, calculate total biscuits needed.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "8",
    sampleOutput: "16",
    testCases: [
      { input: "8", expectedOutput: "16" },
      { input: "3", expectedOutput: "6" },
      { input: "0", expectedOutput: "0" }
    ],
    points: 5,
    level: "easy"
  },
  {
    title: "Movie Tickets",
    description: "Movie tickets cost 120 each. Write a program to calculate total cost based on the number of tickets you want to buy.",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "4",
    sampleOutput: "480",
    testCases: [
      { input: "4", expectedOutput: "480" },
      { input: "1", expectedOutput: "120" },
      { input: "0", expectedOutput: "0" }
    ],
    points: 5,
    level: "easy"
  }
];

// Seed function
const seedDB = async () => {
  try {
    await StoryQuestion.deleteMany(); // Clear previous data
    await StoryQuestion.insertMany(questions); // Insert new data
    console.log("✅ Story Questions Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error while seeding story questions:", err);
    process.exit(1);
  }
};

seedDB();
