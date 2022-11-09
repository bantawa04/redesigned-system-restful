const { validationResult } = require("express-validator");
const faker = require("faker");
const { createPost } = require("../utility/post");

exports.getPosts = (req, res, next) => {
  let posts = [];
  try {
    if (req.query.n) {
      for (let i = 1; i <= req.query.n; i++) {
        posts.push({ ...createPost(), id: i });
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        posts.push({ ...createPost(), id: i });
      }
    }
    res.status(200).json({
      posts: posts,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    //   console.log(req);
    const errors = validationResult(req);
    const post = {
      id: Math.floor(Math.random() * 201),
      title: req.body.title,
      content: req.body.content,
      created_at: faker.date.recent(),
    };
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    res.status(201).json({
      message: "Post created sucessfully !",
      post: post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    if (id > 0 && id <= 200) {
      const post = {
        id: id,
        title: req.body.title,
        content: req.body.content,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };

      res.status(200).json({
        message: "Post updated",
        post: post,
      });
    } else {
      const error = new Error("Invalid input");
      error.message = "Post with id "+id+" doesn't exist.";
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (postId < 200) {
      res.status(200).json({
        post: { ...createPost(), id: postId },
      });
    } else {
      res.status(422).json({
        message:"ID must be less than 200",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    if (req.params.id > 0 && req.params.id <= 200) {
      res.status(200).json({
        message: "Post deleted successfully.",
      });
    } else {
      const error = new Error("Invalid input");
      error.message = "Post ID must be between 1 to 200";
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
