const {
  gptResponse,
  gptAnotherResponse,
  gptHardcoded,
} = require("../controllers/gptController");

const router = require("express").Router();

router.post("/prompt", gptResponse);
router.post("/hello", gptAnotherResponse);
router.post("/hardcode", gptHardcoded);

module.exports = router;
