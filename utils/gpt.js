const OpenAI = require("openai");
const { stream } = require("xlsx");
require("dotenv").config();

let configuration = {
  apiKey: process.env.OPEN_AI_API_KEY,
};

const openai = new OpenAI(configuration);

const chapGPT = async (
  prompt,
  systemPrompts = [],
  gptVersion = "gpt-4-0613"
) => {
  try {
    let stream = await openai.chat.completions.create({
      model: gptVersion,
      messages: [{ role: "user", content: prompt }, ...systemPrompts],
      temperature: 0.2,
      stream: true,
    });
    let res = "";
    for await (const chunk of stream) {
      if (chunk.choices[0]?.finish_reason === "stop") {
        return res + (chunk.choices[0]?.delta?.content || "");
      } else {
        res += chunk.choices[0]?.delta?.content || "";
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { chapGPT };
