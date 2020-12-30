const { validationResult } = require("express-validator");
const faker = require("faker");
const { createTodo } = require("../utility/todo");

exports.getById = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    if (todoId > 0 && todoId <= 200) {
      res.status(200).json({
        todo: { ...createTodo(), id: todoId },
      });
    } else {
      res.status(422).json({
        message: "Invalid request."
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTodos = (req, res, next) => {
  let todos = [];
  try {
    if (req.query.n) {
      for (let i = 1; i <= req.query.n; i++) {
        todos.push({ ...createTodo(), id: i });
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        todos.push({ ...createTodo(), id: i });
      }
    }
    res.status(200).json({
      todos: todos,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    //   console.log(req);
    const errors = validationResult(req);
    const todo = {
      id: Math.floor(Math.random() * 201),
      task: req.body.title,
      status: req.body.status,
      created_at: faker.date.recent(),
    };
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    res.status(201).json({
      message: "Task created sucessfully !",
      todo: todo,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    if (id > 0 && id <= 200) {
      const todo = {
        id: id,
        title: req.body.title,
        status: req.body.status,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };

      res.status(200).json({
        message: "Task updated",
        todo: todo,
      });
    } else {
      const error = new Error("Invalid input");
      error.message = "Todo with id "+id+" doesn't exist.";
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

exports.deleteTodo = async (req, res, next) => {
  try {
    if (req.params.id > 0 && req.params.id <= 200) {
      res.status(200).json({
        message: "Task deleted successfully.",
      });
    } else {
      const error = new Error("Invalid input");
      error.message = "Task ID must be between 1 to 200";
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
