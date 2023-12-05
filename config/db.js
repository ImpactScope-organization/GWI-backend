const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected successfully : ${process.env.MONGO_URL}`);
  } catch (error) {
    console.log("Error connecting to Mongo");
  }
};

// module.exports = connectDatabase
module.exports = connectDatabase;
