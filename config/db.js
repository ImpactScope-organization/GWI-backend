const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URL).then((data) => {
    console.log(`Monogodb connected with server`);
    console.log(`Monogodb connected with server : ${data.connection.host} `)
  });
};

// module.exports = connectDatabase
module.exports = connectDatabase;
