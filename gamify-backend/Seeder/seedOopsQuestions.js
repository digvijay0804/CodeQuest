const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/Question");

dotenv.config(); // ✅ ensures .env variables are loaded

const oopsQuestions = [
  {
    question: "Which of the following is not a principle of OOP?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"],
    correctAnswer: "Compilation"
  },
  {
    question: "What is encapsulation?",
    options: [
      "Binding data and methods together",
      "Hiding implementation details",
      "Overloading operators",
      "Inheritance of methods"
    ],
    correctAnswer: "Binding data and methods together"
  },
  {
    question: "Which feature of OOP indicates code reusability?",
    options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"],
    correctAnswer: "Inheritance"
  },
  {
    question: "Which of the following supports runtime polymorphism?",
    options: [
      "Method overloading",
      "Operator overloading",
      "Method overriding",
      "Data hiding"
    ],
    correctAnswer: "Method overriding"
  },
  {
    question: "Which OOP concept hides implementation details?",
    options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
    correctAnswer: "Abstraction"
  },
  {
    question: "Which of these is not a type of inheritance?",
    options: ["Single", "Multiple", "Hybrid", "Distributed"],
    correctAnswer: "Distributed"
  },
  {
    question: "Which access specifier makes members visible only inside the class?",
    options: ["Public", "Private", "Protected", "Default"],
    correctAnswer: "Private"
  },
  {
    question: "Which constructor is called automatically when an object is created?",
    options: ["Copy constructor", "Default constructor", "Parameterized constructor", "Virtual constructor"],
    correctAnswer: "Default constructor"
  },
  {
    question: "Which keyword is used to inherit a class in C++?",
    options: ["extends", "inherits", "base", "public"],
    correctAnswer: "public"
  },
  {
    question: "Which of these is achieved by function overloading?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
    correctAnswer: "Polymorphism"
  },
  {
    question: "Destructor in C++ is denoted by?",
    options: ["~ClassName()", "!ClassName()", "delete ClassName()", "Destructor()"],
    correctAnswer: "~ClassName()"
  },
  {
    question: "Which of the following cannot be inherited?",
    options: ["Private members", "Protected members", "Public members", "Methods"],
    correctAnswer: "Private members"
  },
  {
    question: "Which OOP feature helps achieve dynamic binding?",
    options: ["Encapsulation", "Abstraction", "Virtual functions", "Friend functions"],
    correctAnswer: "Virtual functions"
  },
  {
    question: "Friend functions violate which OOP principle?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correctAnswer: "Encapsulation"
  },
  {
    question: "Which operator is overloaded for object creation?",
    options: ["new", "malloc", "create", "alloc"],
    correctAnswer: "new"
  },
  {
    question: "Abstract class in Java can contain?",
    options: ["Only abstract methods", "Only data members", "Both abstract and concrete methods", "Only static methods"],
    correctAnswer: "Both abstract and concrete methods"
  },
  {
    question: "Which keyword prevents inheritance?",
    options: ["sealed", "final", "static", "private"],
    correctAnswer: "final"
  },
  {
    question: "Which is true for interfaces in Java?",
    options: [
      "Can have constructors",
      "Can contain concrete methods",
      "Supports multiple inheritance",
      "Can extend multiple classes"
    ],
    correctAnswer: "Supports multiple inheritance"
  },
  {
    question: "Which OOP principle increases code security?",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Overloading"],
    correctAnswer: "Encapsulation"
  },
  {
    question: "Virtual functions must be defined as?",
    options: ["Static", "Public", "Private", "Member functions"],
    correctAnswer: "Member functions"
  },
  {
    question: "Which OOP principle allows the same name function with different signatures?",
    options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
    correctAnswer: "Polymorphism"
  },
  {
    question: "Which OOP principle relates to 'is-a' relationship?",
    options: ["Polymorphism", "Abstraction", "Inheritance", "Encapsulation"],
    correctAnswer: "Inheritance"
  },
  {
    question: "Multiple inheritance is supported in?",
    options: ["Java", "C#", "Python", "Kotlin"],
    correctAnswer: "Python"
  },
  {
    question: "Which function is called when object goes out of scope?",
    options: ["Constructor", "Destructor", "Virtual function", "Finalize()"],
    correctAnswer: "Destructor"
  },
  {
    question: "Which allows creating a blueprint for other classes?",
    options: ["Interface", "Abstract class", "Virtual method", "Template"],
    correctAnswer: "Abstract class"
  }
];

async function seedOopsQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany({ subject: "oops" });
    await Question.insertMany(oopsQuestions.map(q => ({ ...q, subject: "oops" })));
    console.log("✅ OOPS questions seeded!");
  } catch (err) {
    console.error("❌ Error seeding OOPS questions:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedOopsQuestions();
