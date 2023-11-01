const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

let configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);



const chapGPT = async (prompt) => {
  try {
    let response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    return response.data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    console.log("gpt error");
    throw err;
  }
};

module.exports = { chapGPT };
