require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const configuration = new Configuration({
  organization: "org-l0cNBbeMn1Rt9cabZOTLWYBr",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3080;

app.use(cors());
app.use(bodyParser.json());

//for getting response for any chat prompt

app.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: req.body.systemMessage },
        { role: "user", content: req.body.message },
      ],
      max_tokens: 100,
    });

    res.json({
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

//for editing the uploaded pdf text into good prompt so that the size gets reduced and give better result
//only when someone upload a file , this api will be called.

app.post("/edit", async (req, res) => {
  try {
    console.log(req.body);

    const response = await openai.createEdit({
      model: "text-davinci-edit-001",
      input: req.body,
      instruction:
        "Please rephrase the input to minimize token count without omitting any details. Ensure grammatical correctness, fix any spelling errors, and optimize the format for easy retrieval of information when used as a prompt for the OPEN AI API.",
    });

    res.json({
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
