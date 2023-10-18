const { updatePrompt, getPrompt } = require("../controllers/promptController");

const router = require("express").Router();

router.put("/updatePrompt", updatePrompt);
router.get("/", getPrompt);

module.exports = router;
