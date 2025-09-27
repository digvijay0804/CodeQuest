// backend/controllers/codeClashController.js
const CodeClashQuestion = require("../models/CodeClashQuestion");
const PowerupInventory = require("../models/PowerupInventory");

exports.getAvailableQuestions = async (req, res) => {
  try {
    const questions = await CodeClashQuestion.find().limit(50);
    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Check inventory
exports.getInventory = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.json({ success: true, data: { items: [] } });

    const inv = await PowerupInventory.findOne({ userId });
    res.json({ success: true, data: inv || { items: [] } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
