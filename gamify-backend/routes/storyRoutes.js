const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

router.get("/", storyController.getStoryQuestions); // all
router.get("/difficulty/:level", storyController.getQuestionsByDifficulty); 
router.get("/:id", storyController.getStoryQuestionById);
router.post("/submit", storyController.submitCode);

module.exports = router;
