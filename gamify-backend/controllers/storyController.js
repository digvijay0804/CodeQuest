const StoryQuestion = require("../models/storyQuestion");
const { executeCode } = require("../utils/codeExecutor");

// Fetch all questions
exports.getStoryQuestions = async (req, res) => {
  try {
    const questions = await StoryQuestion.find();
    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Fetch single question
exports.getStoryQuestionById = async (req, res) => {
  try {
    const question = await StoryQuestion.findById(req.params.id);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, error: "Question not found" });
    }
    res.json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Submit code for a question
exports.submitCode = async (req, res) => {
  const { questionId, language, code } = req.body;

  if (!questionId || !language || !code) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: questionId, language, or code",
    });
  }

  try {
    const question = await StoryQuestion.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, error: "Question not found" });
    }

    let allPassed = true;
    let failedCase = null;

    for (const testCase of question.testCases) {
      const output = await executeCode(language, code, testCase.input);

      if (output.trim() !== testCase.expectedOutput.trim()) {
        allPassed = false;
        failedCase = {
          input: testCase.input,
          expected: testCase.expectedOutput,
          received: output.trim(),
        };
        break;
      }
    }

    // ✅ If passed, fetch next question in same difficulty
    let nextQuestion = null;
    if (allPassed) {
      nextQuestion = await StoryQuestion.findOne({
        level: question.level,
        _id: { $gt: question._id }, // next based on insertion order
      }).sort({ _id: 1 });
    }

    if (allPassed) {
      return res.json({
        success: true,
        status: "passed",
        points: question.points,
        message: "✅ All test cases passed!",
        nextQuestion, // may be null if no next question
      });
    } else {
      return res.json({
        success: true,
        status: "failed",
        message: "❌ Some test cases failed",
        failedCase,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "❗ Code execution failed",
      detail: err.message,
    });
  }
};

// Fetch questions by difficulty level
exports.getQuestionsByDifficulty = async (req, res) => {
  const { level } = req.params;
  try {
    const questions = await StoryQuestion.find({
      level: level.toLowerCase(),
    }).sort({ _id: 1 });
    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
