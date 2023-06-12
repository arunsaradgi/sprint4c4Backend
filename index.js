const express = require("express");
const { connectDB } = require("./db");
const { userRouter } = require("./routes/users.routes");
const { PostModel } = require("./models/posts.model");
const { postRouter } = require("./routes/posts.routes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

connectDB().then(() => {
  app.listen(process.env.port, async () => {
    try {
      console.log(`connected to server port ${process.env.port}`);
    } catch (error) {
      console.log(error);
    }
  });
});
