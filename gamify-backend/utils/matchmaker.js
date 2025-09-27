// backend/utils/matchmaker.js
const Question = require("../models/Question");

async function pickRandomQuestions(count = 5) {
  // picks random questions from Question collection
  return Question.aggregate([{ $sample: { size: count } }]);
}

/**
 * buildRounds(mode)
 * - returns rounds array with types & duration
 */
async function buildRounds(mode = "timed") {
  // mix of types: 3 MCQ, 1 debug, 1 codegolf (example)
  const pool = await pickRandomQuestions(10); // get more so we can assign types
  const rounds = [
    { roundIndex: 0, type: "mcq", questionId: pool[0]._id, durationSec: 60 },
    { roundIndex: 1, type: "debug", questionId: pool[1]._id, durationSec: 60 },
    { roundIndex: 2, type: "mcq", questionId: pool[2]._id, durationSec: 60 },
    { roundIndex: 3, type: "codegolf", questionId: pool[3]._id, durationSec: 90 },
    { roundIndex: 4, type: "mcq", questionId: pool[4]._1, durationSec: 60 } // last one
  ];

  // if pickRandomQuestions returned less, fallback:
  return rounds.filter(Boolean);
}

module.exports = { buildRounds, pickRandomQuestions };
