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

// module.exports = connectDatabase
module.exports = connectDatabase;
