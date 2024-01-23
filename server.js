const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://gwi-frontend.vercel.app",
  "https://gwi-thirdparty.vercel.app",
  "https://gwi.impactscope.com",
  "https://gwi-admin.impactscope.com",
  "https://gwi-thirdparty-git-main-kostiantyn-zanins-projects.vercel.app",
  "https://gwi-thirdparty-3psk33spg-kostiantyn-zanins-projects.vercel.app",
  // gcp deployed frontend URLs
  "https://frontend-dot-gwi-env.lm.r.appspot.com", //gwi-fe
  "https://thirdparty-dot-gwi-env.lm.r.appspot.com", //gwi-fe-tp
  // Local URLs
  "http://localhost:3000", // For development purposes
  "http://localhost:3001", // For development purposes
  "*",
];

// Configure CORS with specific origins allowed.
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
        // callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const gptRoute = require("./routes/gptRoute");
const regulatorRoute = require("./routes/regulatorRoute");
const reportRoute = require("./routes/reportRoute");
const promptRoute = require("./routes/promptRoute");
const companyRoute = require("./routes/companyRoute");

app.use("/api/gpt", gptRoute);
app.use("/api/regulator", regulatorRoute);
app.use("/api/report", reportRoute);
app.use("/api/prompt", promptRoute);
// New Routes
app.use("/api/company", companyRoute);

const connectDb = require("./config/db");
connectDb();

app.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});

// Bank of America

// National Bank of Bahrain
