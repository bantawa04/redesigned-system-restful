const faker = require("faker");
const { createUser } = require("../utility/user");

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId > 0 && userId <= 200) {
      res.status(200).json({
        user: { ...createUser(), id: userId },
      });
    } else {
      const error = new Error("Invalid input");
      error.message = "Product with id "+userId+" doesn't exist.";
      error.statusCode = 400;
      throw error;;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUsers = (req, res, next) => {
  let users = [];
  try {
    if (req.query.n) {
      for (let i = 1; i <= req.query.n; i++) {
        users.push({ ...createUser(), id: i });
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        users.push({ ...createUser(), id: i });
      }
    }
    res.status(200).json({
      users: users,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
