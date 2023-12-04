const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((data) => {
      console.log(`Monogodb connected with server`);
      console.log(`Monogodb connected with server : ${data.connection.host} `);
    })
    .catch((err) => console.log("Error connecting to server", err));
};

// Check the connection status
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("connected", () => {
  console.log("Connected to MongoDB!");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Function to gracefully close the connection
const gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
};

// If Node.js process ends, close the Mongoose connection
process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);

// module.exports = connectDatabase
module.exports = connectDatabase;
