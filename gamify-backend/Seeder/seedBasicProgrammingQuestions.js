const mongoose = require("mongoose");
const Question = require("../models/Question");
const dotenv = require('dotenv');

dotenv.config();

const basicProgrammingQuestions = [
  {
    question: "What is the difference between a compiler and an interpreter?",
    options: [
      "Compiler translates code line by line; Interpreter translates all at once",
      "Compiler translates all at once; Interpreter translates line by line",
      "Both work the same",
      "None of the above"
    ],
    correctAnswer: "Compiler translates all at once; Interpreter translates line by line"
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["Python", "HTML", "C++", "Java"],
    correctAnswer: "HTML"
  },
  {
    question: "What does IDE stand for?",
    options: [
      "Integrated Development Environment",
      "Internet Development Editor",
      "Integrated Debugging Environment",
      "Internal Development Execution"
    ],
    correctAnswer: "Integrated Development Environment"
  },
  {
    question: "Which programming language is known as the 'mother of all languages'?",
    options: ["C", "Java", "Python", "Assembly"],
    correctAnswer: "C"
  },
  {
    question: "What is the smallest unit of memory?",
    options: ["Bit", "Byte", "Word", "Nibble"],
    correctAnswer: "Bit"
  },
  {
    question: "Which of these is not a type of loop?",
    options: ["for", "while", "repeat-until", "switch"],
    correctAnswer: "switch"
  },
  {
    question: "Which symbol is used for comments in C++ single line?",
    options: ["//", "#", "/* */", "--"],
    correctAnswer: "//"
  },
  {
    question: "Which keyword is used to declare a constant in C?",
    options: ["static", "final", "const", "let"],
    correctAnswer: "const"
  },
  {
    question: "Which function is used to print output in C?",
    options: ["echo()", "print()", "printf()", "console.log()"],
    correctAnswer: "printf()"
  },
  {
    question: "Which data structure uses LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack"
  },
  {
    question: "Which one is not an OOP concept?",
    options: ["Encapsulation", "Abstraction", "Polymorphism", "Compilation"],
    correctAnswer: "Compilation"
  },
  {
    question: "Which operator is used to access members of a class in C++?",
    options: [".", "->", "::", ":"],
    correctAnswer: "."
  },
  {
    question: "What does ASCII stand for?",
    options: [
      "American Standard Code for Information Interchange",
      "Advanced Standard Code for Internet Interchange",
      "Automated System Code for Information",
      "None of the above"
    ],
    correctAnswer: "American Standard Code for Information Interchange"
  },
  {
    question: "Which of the following is not a valid variable name in C?",
    options: ["_value", "value1", "1value", "value_2"],
    correctAnswer: "1value"
  },
  {
    question: "Which header file is required for using printf() and scanf() in C?",
    options: ["<iostream>", "<stdio.h>", "<conio.h>", "<stdlib.h>"],
    correctAnswer: "<stdio.h>"
  },
  {
    question: "What is the extension of C++ source code files?",
    options: [".java", ".c", ".cpp", ".py"],
    correctAnswer: ".cpp"
  },
  {
    question: "Which function is used to read input in C?",
    options: ["input()", "scanf()", "cin", "get()"],
    correctAnswer: "scanf()"
  },
  {
    question: "Which keyword is used to exit from a loop?",
    options: ["exit", "stop", "break", "end"],
    correctAnswer: "break"
  },
  {
    question: "Which operator is used to compare two values?",
    options: ["=", "==", "===", "!="],
    correctAnswer: "=="
  },
  {
    question: "What is the default return type of main() in C?",
    options: ["void", "int", "float", "char"],
    correctAnswer: "int"
  },
  {
    question: "Which is the correct way to declare an array in C?",
    options: [
      "int arr[5];",
      "int arr;",
      "array arr[5];",
      "int arr{5};"
    ],
    correctAnswer: "int arr[5];"
  },
  {
    question: "Which of the following is a logical operator?",
    options: ["&&", "&", "||", "Both && and ||"],
    correctAnswer: "Both && and ||"
  },
  {
    question: "Which function is used to allocate memory dynamically in C?",
    options: ["malloc()", "alloc()", "new()", "create()"],
    correctAnswer: "malloc()"
  },
  {
    question: "What is recursion?",
    options: [
      "A function calling itself",
      "A function calling another function",
      "Loop inside a loop",
      "None of the above"
    ],
    correctAnswer: "A function calling itself"
  },
  {
    question: "Which keyword is used to define a class in C++?",
    options: ["object", "class", "define", "struct"],
    correctAnswer: "class"
  }
];

async function seedBasicProgrammingQuestions() {
  await mongoose.connect(process.env.MONGO_URI);
  await Question.deleteMany({ subject: "basic programming" });
  await Question.insertMany(basicProgrammingQuestions.map(q => ({ ...q, subject: "basic programming" })));
  console.log("✅ Basic Programming questions seeded!");
  mongoose.disconnect();
}

seedBasicProgrammingQuestions();
