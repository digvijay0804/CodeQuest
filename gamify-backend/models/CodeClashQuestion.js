const mongoose = require("mongoose");

const codeClashQuestionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  difficulty: { type: String, required: true },
});

// 👇 Explicitly tell Mongoose to use "codeclashquestions" collection
module.exports = mongoose.model("CodeClashQuestion", codeClashQuestionSchema, "codeclashquestions");
