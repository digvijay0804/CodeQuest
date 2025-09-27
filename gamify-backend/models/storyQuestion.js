// models/storyQuestion.js
const mongoose = require("mongoose");

const storyQuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  languageSupport: [String], // ["python", "java", "c", "cpp", "js"]
  sampleInput: String,
  sampleOutput: String,
  testCases: [
    {
      input: String,
      expectedOutput: String
    }
  ],
  points: Number,
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  }
});

module.exports = mongoose.model("StoryQuestion", storyQuestionSchema);
