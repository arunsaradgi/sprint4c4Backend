const express = require("express");
const { PostModel } = require("../models/posts.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth.middleware");

const postRouter = express.Router();

postRouter.use(auth);

postRouter.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res
      .status(201)
      .json({ msg: `post has been added by ${req.user}`, post: req.body });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find({ userId: req.body.userId });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  //userIdInUserDoc===userIdinPostDoc
  const userIdInUserDoc = req.body.userId;
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });
    const userIdInPostDoc = post.userId;
    if (userIdInUserDoc === userIdInPostDoc) {
      await PostModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(202).json({ msg: `post is updated`, post: req.body });
    } else {
      res.status(300).json({ msg: "not authorized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  //userIdInUserDoc===userIdinPostDoc
  const userIdInUserDoc = req.body.userId;
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });
    const userIdInPostDoc = post.userId;
    if (userIdInUserDoc === userIdInPostDoc) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(202).json({ msg: `post is deleted`, post: req.body });
    } else {
      res.status(300).json({ msg: "not authorized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = {
  postRouter,
};
