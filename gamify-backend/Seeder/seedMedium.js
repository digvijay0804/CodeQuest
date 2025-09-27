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

// Define medium-level seed data
const mediumQuestions = [
  {
    title: "Cinema Snack Time",
    description: "A family of 4 goes to the cinema. Each person buys a ticket and a popcorn. Tickets cost Rs. 150, and popcorn costs Rs. 80. Calculate total expense.",
    level: "medium",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "4",
    sampleOutput: "920",
    testCases: [
      { input: "4", expectedOutput: "920" },
      { input: "2", expectedOutput: "460" },
      { input: "0", expectedOutput: "0" }
    ],
    points: 20
  },
  {
    title: "Weekly Budget Tracker",
    description: "You're managing a weekly budget. You're given expenses for each day. Write a program to find total and average daily expense.",
    level: "medium",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "200 150 300 100 250 400 200",
    sampleOutput: "1600 228",
    testCases: [
      { input: "200 150 300 100 250 400 200", expectedOutput: "1600 228" },
      { input: "100 100 100 100 100 100 100", expectedOutput: "700 100" },
      { input: "0 0 0 0 0 0 0", expectedOutput: "0 0" }
    ],
    points: 25
  },
  {
    title: "Book Club Distribution",
    description: "You have `n` members in your book club. You received `m` books. Distribute books equally and tell how many members won’t receive any book.",
    level: "medium",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "5 22",
    sampleOutput: "2",
    testCases: [
      { input: "5 22", expectedOutput: "2" },
      { input: "4 16", expectedOutput: "0" },
      { input: "6 17", expectedOutput: "5" }
    ],
    points: 20
  },
  {
    title: "Charity Event Donation",
    description: "You organize a charity event. Each ticket sold raises Rs. 120. If 25% goes to expenses, calculate the final donation amount.",
    level: "medium",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "10",
    sampleOutput: "900",
    testCases: [
      { input: "10", expectedOutput: "900" },
      { input: "0", expectedOutput: "0" },
      { input: "4", expectedOutput: "360" }
    ],
    points: 25
  },
  {
    title: "Workshop Materials Cost",
    description: "You’re organizing a workshop. Each participant needs 3 items (pen: Rs. 10, notebook: Rs. 25, folder: Rs. 15). Calculate total cost for `n` participants.",
    level: "medium",
    languageSupport: ["python", "java", "c", "cpp", "js"],
    sampleInput: "5",
    sampleOutput: "250",
    testCases: [
      { input: "5", expectedOutput: "250" },
      { input: "1", expectedOutput: "50" },
      { input: "0", expectedOutput: "0" }
    ],
    points: 20
  }
];

// Seed function
const seedMedium = async () => {
  try {
    await StoryQuestion.insertMany(mediumQuestions);
    console.log("✅ Medium Level Story Questions Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error while seeding medium-level questions:", err);
    process.exit(1);
  }
};

seedMedium();
