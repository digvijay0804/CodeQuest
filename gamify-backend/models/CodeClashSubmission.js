const mongoose = require("mongoose");

const codeClashSubmissionSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true, // multiplayer room identifier
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "CodeClashQuestion" },
      selectedAnswer: String,
      isCorrect: Boolean,
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
  timeTaken: {
    type: Number, // in seconds
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CodeClashSubmission", codeClashSubmissionSchema);
