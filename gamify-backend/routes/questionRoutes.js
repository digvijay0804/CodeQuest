// routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// GET questions by subject
router.get("/:subject", async (req, res) => {
  try {
    const { subject } = req.params;
    const questions = await Question.find({ subject });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
