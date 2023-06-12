const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.mongoURL);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDB,
};
