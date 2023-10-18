const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const gptRoute = require("./routes/gptRoute");
const regulatorRoute = require("./routes/regulatorRoute");
const reportRoute = require("./routes/reportRoute");
const promptRoute = require("./routes/promptRoute");

const connectDb = require("./config/db");
app.use("/api/gpt", gptRoute);
app.use("/api/regulator", regulatorRoute);
app.use("/api/report", reportRoute);
app.use("/api/prompt", promptRoute);

connectDb();

app.listen(5000, () => {
  console.log("server listening on port ", 5000);
});

// Bank of America

// National Bank of Bahrain
