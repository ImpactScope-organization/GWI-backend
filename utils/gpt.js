const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

let configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chapGPT = async (prompt, systemPrompts = [], gptVersion = "gpt-4") => {
  try {
    let response = await openai.createChatCompletion({
      // maxRetries: 5,
      model: gptVersion,
      messages: [{ role: "user", content: prompt }, ...systemPrompts],
      temperature: 0.2,
      n: 1,
    });
    return response.data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    console.log("gpt error");
    throw err;
  }
};

module.exports = { chapGPT };
