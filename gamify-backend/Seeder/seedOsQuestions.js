// Seeder/seedOsQuestions.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/Question");

dotenv.config(); // ✅ ensures .env variables are loaded

// OS Questions (25)
const osQuestions = [
  {
    question: "Which of the following is not a function of an operating system?",
    options: ["Process management", "Memory management", "Compiler design", "File management"],
    correctAnswer: "Compiler design"
  },
  {
    question: "Which scheduling algorithm may cause starvation?",
    options: ["First-Come-First-Serve (FCFS)", "Shortest Job Next (SJN)", "Round Robin (RR)", "Priority Scheduling"],
    correctAnswer: "Priority Scheduling"
  },
  {
    question: "In Round Robin scheduling, the performance depends heavily on:",
    options: ["Size of time quantum", "Number of processes", "CPU speed", "I/O devices"],
    correctAnswer: "Size of time quantum"
  },
  {
    question: "Thrashing occurs when:",
    options: [
      "Processes are waiting for CPU",
      "Processes are waiting for I/O",
      "The system spends more time swapping than executing processes",
      "There is deadlock"
    ],
    correctAnswer: "The system spends more time swapping than executing processes"
  },
  {
    question: "Which of the following is a non-preemptive scheduling algorithm?",
    options: ["Round Robin", "Shortest Remaining Time First", "First-Come-First-Serve", "Priority (Preemptive)"],
    correctAnswer: "First-Come-First-Serve"
  },
  {
    question: "Deadlock can be avoided by:",
    options: ["Banker’s Algorithm", "Disk Scheduling", "Spooling", "Paging"],
    correctAnswer: "Banker’s Algorithm"
  },
  {
    question: "Which of the following is not a page replacement algorithm?",
    options: ["FIFO", "LRU", "Optimal", "SSTF"],
    correctAnswer: "SSTF"
  },
  {
    question: "Page fault occurs when:",
    options: [
      "Page is found in memory",
      "Page is not found in memory",
      "Page is corrupted",
      "Page is removed from disk"
    ],
    correctAnswer: "Page is not found in memory"
  },
  {
    question: "Which disk scheduling algorithm is also called elevator algorithm?",
    options: ["FIFO", "SSTF", "SCAN", "C-SCAN"],
    correctAnswer: "SCAN"
  },
  {
    question: "In which technique is the CPU idle while I/O takes place?",
    options: ["Spooling", "Polling", "DMA", "Interrupt"],
    correctAnswer: "Polling"
  },
  {
    question: "Which of the following is a type of fragmentation in memory management?",
    options: ["Internal and External", "Vertical and Horizontal", "Static and Dynamic", "Direct and Indirect"],
    correctAnswer: "Internal and External"
  },
  {
    question: "The critical section problem is used to achieve:",
    options: ["Deadlock", "Starvation", "Mutual Exclusion", "Thrashing"],
    correctAnswer: "Mutual Exclusion"
  },
  {
    question: "Semaphore is used for:",
    options: ["Synchronization", "Memory allocation", "Deadlock prevention", "CPU scheduling"],
    correctAnswer: "Synchronization"
  },
  {
    question: "Which of the following is not a valid state of a process?",
    options: ["Ready", "Waiting", "Blocked", "Completed"],
    correctAnswer: "Completed"
  },
  {
    question: "Which memory allocation strategy suffers from external fragmentation?",
    options: ["Paging", "Segmentation", "Fixed Partitioning", "Demand Paging"],
    correctAnswer: "Segmentation"
  },
  {
    question: "In demand paging, the valid-invalid bit is used to:",
    options: ["Check page is in memory", "Check page size", "Check page fault rate", "Check page replacement policy"],
    correctAnswer: "Check page is in memory"
  },
  {
    question: "Which one is not a disk scheduling algorithm?",
    options: ["FCFS", "SSTF", "SCAN", "LRU"],
    correctAnswer: "LRU"
  },
  {
    question: "Virtual memory is:",
    options: [
      "An extremely large main memory",
      "An extremely large secondary storage",
      "An illusion of large main memory",
      "A type of cache memory"
    ],
    correctAnswer: "An illusion of large main memory"
  },
  {
    question: "Context switching is:",
    options: ["Switching from user mode to kernel mode", "Saving and restoring CPU state", "Deadlock resolution", "Disk scheduling"],
    correctAnswer: "Saving and restoring CPU state"
  },
  {
    question: "Spooling is used in:",
    options: ["Batch processing", "Real-time processing", "Interactive systems", "Multiprocessing"],
    correctAnswer: "Batch processing"
  },
  {
    question: "Which scheduling is ideal for time-sharing systems?",
    options: ["FCFS", "SJF", "Priority", "Round Robin"],
    correctAnswer: "Round Robin"
  },
  {
    question: "Belady’s anomaly is related to:",
    options: ["Deadlock", "Paging", "Segmentation", "Thrashing"],
    correctAnswer: "Paging"
  },
  {
    question: "Which is not a goal of operating systems?",
    options: ["Convenience", "Efficiency", "Ability to evolve", "Compilation"],
    correctAnswer: "Compilation"
  },
  {
    question: "Which memory management technique does not suffer from external fragmentation?",
    options: ["Paging", "Segmentation", "Fixed Partitioning", "Variable Partitioning"],
    correctAnswer: "Paging"
  },
  {
    question: "What is the main function of the command interpreter?",
    options: ["Process creation", "Command execution", "File system management", "Memory allocation"],
    correctAnswer: "Command execution"
  }
];

async function seedOsQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany({ subject: "os" });
    await Question.insertMany(osQuestions.map(q => ({ ...q, subject: "os" })));
    console.log("✅ OS questions seeded!");
  } catch (err) {
    console.error("❌ Error seeding OS questions:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedOsQuestions();
