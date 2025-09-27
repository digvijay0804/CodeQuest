// backend/models/ClashMatch.js
const mongoose = require("mongoose");

const PerRoundSchema = new mongoose.Schema({
  roundIndex: Number,
  type: { type: String, enum: ["mcq", "debug", "codegolf"], required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  durationSec: Number
});

const PlayerScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  username: String,
  socketId: String,
  total: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  perRound: [{ roundIndex: Number, score: Number, correct: Boolean, timeTakenMs: Number }]
});

const ClashMatchSchema = new mongoose.Schema({
  roomCode: { type: String, unique: true },
  status: { type: String, enum: ["waiting", "in_progress", "finished"], default: "waiting" },
  mode: { type: String, enum: ["timed", "sprint"], default: "timed" },
  rounds: [PerRoundSchema],
  players: [PlayerScoreSchema],
  startedAt: Date,
  finishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("ClashMatch", ClashMatchSchema);
