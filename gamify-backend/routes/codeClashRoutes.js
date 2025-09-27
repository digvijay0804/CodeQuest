// backend/routes/codeClashRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/codeClashController");

router.get("/questions", controller.getAvailableQuestions);
router.get("/inventory", controller.getInventory);

module.exports = router;
