const PromptModel = require("../model/promptModel");

const updatePrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(404).json({ message: "Insufficient details!" });
  }

  try {
    const prompt = await PromptModel.findOne({ role: "admin" });

    if (!prompt) {
      return res.status(404).json({ message: "Err occured" });
    }

    const updatePrompt = await PromptModel.findOneAndUpdate(
      { role: "admin" },
      req.body,
      { new: true }
    );

    if (!updatePrompt) {
      return res.status(403).json({ message: "Err occured" });
    }

    res.status(200).json({ result: updatePrompt });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPrompt = async (req, res) => {
  try {
    const prompt = await PromptModel.findOne({ role: "admin" });

    if (!prompt) {
      return res.status(404).json({ message: "Err occured" });
    }

    res.status(200).json({ result: prompt });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  updatePrompt,
  getPrompt,
};
