const express = require('express');
const router = express.Router();
const executeCode = require('../utils/codeExecutor');

// @route POST /api/code/execute
router.post('/execute', async (req, res) => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' });
  }

  const result = await executeCode(code, language, input);
  res.json(result);
});

module.exports = router;
