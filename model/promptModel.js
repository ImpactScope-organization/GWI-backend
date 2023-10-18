const mongoose = require("mongoose");
const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("prompt", promptSchema);
