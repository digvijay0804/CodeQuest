// Seeder/seedDebuggingQuestions.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/Question");

dotenv.config(); // ✅ load .env

const debuggingQuestions = [
  {
    question: "What is the primary goal of debugging?",
    options: [
      "To add new features",
      "To fix errors and improve program correctness",
      "To improve UI design",
      "To optimize server performance"
    ],
    correctAnswer: "To fix errors and improve program correctness"
  },
  {
    question: "Which of the following is NOT a common type of bug?",
    options: ["Syntax error", "Logical error", "Runtime error", "Compilation optimization"],
    correctAnswer: "Compilation optimization"
  },
  {
    question: "Which tool is most commonly used for debugging in Java?",
    options: ["JDB", "GDB", "PDB", "DBG"],
    correctAnswer: "JDB"
  },
  {
    question: "Which debugging technique involves tracking variable values step-by-step?",
    options: ["Backtracking", "Print statement debugging", "Tracing", "Binary search debugging"],
    correctAnswer: "Tracing"
  },
  {
    question: "What does a segmentation fault indicate?",
    options: [
      "Incorrect loop condition",
      "Accessing memory not allocated to the program",
      "Syntax error",
      "Null pointer handled correctly"
    ],
    correctAnswer: "Accessing memory not allocated to the program"
  },
  {
    question: "Which debugging technique uses breakpoints?",
    options: ["Manual code review", "Interactive debugging", "Backtracking", "Static analysis"],
    correctAnswer: "Interactive debugging"
  },
  {
    question: "In debugging, what is a ‘watch’ used for?",
    options: ["To pause execution", "To observe variable values during execution", "To improve CPU speed", "To remove unused code"],
    correctAnswer: "To observe variable values during execution"
  },
  {
    question: "What is the first step in debugging?",
    options: ["Rewriting the code", "Identifying and reproducing the bug", "Optimizing performance", "Adding comments"],
    correctAnswer: "Identifying and reproducing the bug"
  },
  {
    question: "Which type of error is hardest to detect?",
    options: ["Syntax error", "Runtime error", "Logical error", "Compilation error"],
    correctAnswer: "Logical error"
  },
  {
    question: "Which of the following helps in automated debugging?",
    options: ["Debugger tools", "IDE features", "Static analyzers", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    question: "What is ‘rubber duck debugging’?",
    options: [
      "Explaining the code line by line to an inanimate object",
      "Using a duck logo debugger",
      "Water-cooling a system to prevent bugs",
      "Debugging aquatic software"
    ],
    correctAnswer: "Explaining the code line by line to an inanimate object"
  },
  {
    question: "Which error occurs due to division by zero?",
    options: ["Runtime error", "Syntax error", "Logical error", "Linking error"],
    correctAnswer: "Runtime error"
  },
  {
    question: "Which debugging technique involves moving backwards to find the source of an error?",
    options: ["Backtracking", "Tracing", "Forward analysis", "Breakpointing"],
    correctAnswer: "Backtracking"
  },
  {
    question: "What is the purpose of a stack trace?",
    options: ["To optimize recursion", "To show the call hierarchy at the point of failure", "To check memory leaks", "To monitor CPU usage"],
    correctAnswer: "To show the call hierarchy at the point of failure"
  },
  {
    question: "Which error type does a compiler catch?",
    options: ["Syntax error", "Logical error", "Runtime error", "Segmentation fault"],
    correctAnswer: "Syntax error"
  },
  {
    question: "Which debugging tool is used for C programs?",
    options: ["JDB", "PDB", "GDB", "DBG"],
    correctAnswer: "GDB"
  },
  {
    question: "Which of the following is an example of static debugging?",
    options: ["Code walkthrough", "Using breakpoints", "Print statement debugging", "Interactive debugging"],
    correctAnswer: "Code walkthrough"
  },
  {
    question: "Which error is caused by incorrect algorithm implementation?",
    options: ["Runtime error", "Syntax error", "Logical error", "System error"],
    correctAnswer: "Logical error"
  },
  {
    question: "What does ‘step over’ do in debugging?",
    options: [
      "Executes the current line without going inside functions",
      "Skips execution",
      "Jumps to the next breakpoint",
      "Stops debugging"
    ],
    correctAnswer: "Executes the current line without going inside functions"
  },
  {
    question: "What is memory leak debugging used for?",
    options: [
      "Fixing syntax errors",
      "Checking unallocated memory usage",
      "Detecting memory not freed after use",
      "Optimizing stack frames"
    ],
    correctAnswer: "Detecting memory not freed after use"
  },
  {
    question: "Which language has the PDB debugger?",
    options: ["Python", "Java", "C++", "JavaScript"],
    correctAnswer: "Python"
  },
  {
    question: "What is the difference between testing and debugging?",
    options: [
      "Testing finds errors, debugging fixes them",
      "Testing fixes errors, debugging finds them",
      "Both are the same",
      "Debugging is done before testing"
    ],
    correctAnswer: "Testing finds errors, debugging fixes them"
  },
  {
    question: "Which command is used in GDB to run the program?",
    options: ["start", "execute", "run", "launch"],
    correctAnswer: "run"
  },
  {
    question: "Which debugging method involves printing intermediate values?",
    options: ["Print statement debugging", "Tracing", "Backtracking", "Binary search debugging"],
    correctAnswer: "Print statement debugging"
  },
  {
    question: "What does a null pointer exception mean?",
    options: [
      "Pointer has no valid memory reference",
      "Stack overflow",
      "Incorrect syntax",
      "Wrong return type"
    ],
    correctAnswer: "Pointer has no valid memory reference"
  }
];

async function seedDebuggingQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany({ subject: "debugging" });
    await Question.insertMany(debuggingQuestions.map(q => ({ ...q, subject: "debugging" })));
    console.log("✅ Debugging questions seeded!");
  } catch (err) {
    console.error("❌ Error seeding Debugging questions:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedDebuggingQuestions();
