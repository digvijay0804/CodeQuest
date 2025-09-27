const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CodeClashQuestion = require("../models/CodeClashQuestion");

dotenv.config({ path: "../.env" });

const questions = [
  {
    subject: "basic",
    question: "What is the output of console.log(typeof NaN)?",
    options: ["undefined", "NaN", "object", "number"],
    correctAnswer: "number",
    difficulty: "easy",
  },
  {
    subject: "basic",
    question: "Which of the following is not a programming language?",
    options: ["Python", "Ruby", "HTML", "Java"],
    correctAnswer: "HTML",
    difficulty: "easy",
  },
  {
    subject: "basic",
    question: "In C, which symbol is used to access value at a pointer?",
    options: ["&", "*", "#", "$"],
    correctAnswer: "*",
    difficulty: "easy",
  },
  {
    subject: "os",
    question: "Which scheduling algorithm gives minimum average waiting time?",
    options: ["FCFS", "SJF", "Round Robin", "Priority"],
    correctAnswer: "SJF",
    difficulty: "medium",
  },
  {
    subject: "os",
    question: "Page replacement algorithms are used in which memory management technique?",
    options: ["Paging", "Segmentation", "Swapping", "Contiguous allocation"],
    correctAnswer: "Paging",
    difficulty: "medium",
  },
  {
    subject: "os",
    question: "In OS, thrashing is related to?",
    options: ["CPU Scheduling", "Memory Management", "Deadlock", "File System"],
    correctAnswer: "Memory Management",
    difficulty: "medium",
  },
  {
    subject: "debugging",
    question: "What will be output?\nlet a = [1,2,3]; console.log(a[3]);",
    options: ["undefined", "3", "null", "Error"],
    correctAnswer: "undefined",
    difficulty: "easy",
  },
  {
    subject: "debugging",
    question: "What is wrong in this code? for(int i=0; i<10; i--){ }",
    options: [
      "Infinite loop",
      "Syntax error",
      "Compilation error",
      "Nothing wrong"
    ],
    correctAnswer: "Infinite loop",
    difficulty: "medium",
  },
  {
    subject: "debugging",
    question: "Predict output:\nconsole.log(1 == '1');",
    options: ["true", "false", "error", "undefined"],
    correctAnswer: "true",
    difficulty: "easy",
  },
  {
    subject: "basic",
    question: "Which data structure uses FIFO principle?",
    options: ["Stack", "Queue", "Array", "Tree"],
    correctAnswer: "Queue",
    difficulty: "easy",
  },
  {
    subject: "basic",
    question: "In DBMS, SQL stands for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Standard Query List",
      "Server Query Language"
    ],
    correctAnswer: "Structured Query Language",
    difficulty: "easy",
  },
  {
    subject: "os",
    question: "Which one is a non-preemptive scheduling algorithm?",
    options: ["SJF", "Round Robin", "FCFS", "Priority (Preemptive)"],
    correctAnswer: "FCFS",
    difficulty: "medium",
  },
  {
    subject: "basic",
    question: "Which keyword is used to define a constant in Java?",
    options: ["const", "define", "final", "static"],
    correctAnswer: "final",
    difficulty: "easy",
  },
  {
    subject: "basic",
    question: "What is Big-O of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswer: "O(log n)",
    difficulty: "medium",
  },
  {
    subject: "debugging",
    question: "Output?\nint x=5; printf(\"%d\", x++);",
    options: ["5", "6", "Compilation Error", "Garbage"],
    correctAnswer: "5",
    difficulty: "medium",
  },
  {
    subject: "debugging",
    question: "Output?\nSystem.out.println(10/0);",
    options: ["0", "Infinity", "Exception", "NaN"],
    correctAnswer: "Exception",
    difficulty: "medium",
  },
  {
    subject: "os",
    question: "Deadlock necessary condition NOT included?",
    options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Round Robin"],
    correctAnswer: "Round Robin",
    difficulty: "medium",
  },
  {
    subject: "basic",
    question: "Which is a JavaScript framework?",
    options: ["Django", "Spring", "React", "Laravel"],
    correctAnswer: "React",
    difficulty: "easy",
  },
  {
    subject: "os",
    question: "Which allocation method suffers from external fragmentation?",
    options: ["Contiguous", "Paging", "Segmentation", "Dynamic"],
    correctAnswer: "Contiguous",
    difficulty: "medium",
  },
  {
    subject: "debugging",
    question: "Output?\nconsole.log([] == 0);",
    options: ["true", "false", "undefined", "error"],
    correctAnswer: "true",
    difficulty: "hard",
  },
];

const seedCodeClashQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");

    await CodeClashQuestion.deleteMany();
    await CodeClashQuestion.insertMany(questions);

    console.log("🎉 CodeClash Questions Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding CodeClash questions:", error);
    process.exit(1);
  }
};

seedCodeClashQuestions();
