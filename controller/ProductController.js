const { validationResult } = require("express-validator");
const faker = require("faker");
const { createProduct } = require('../utility/product');

exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    if (productId > 0 && productId <= 200) {
      res.status(200).json({
        product: createProduct()
      });      
    } else {
      const error = new Error('Invalid input.');
      error.statusCode = 422;
      error.message = "ID should be between 1-200";
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProducts = (req, res, next) => {
  let products = [];
  try {
    if (req.query.n) {
      for (let i = 1; i <= req.query.n; i++) {
        products.push({...createProduct(), id: i});
      }
    } else {
      for (let i = 1; i <= 200; i++) {
        products.push({...createProduct(), id: i});
      }
    }
    res.status(200).json({
      products: products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
      console.log(req.body);
    const errors = validationResult(req);
    const product = {                                                
      id: Math.floor(Math.random() * 201),
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      created_at: faker.date.recent(),
    };
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    res.status(201).json({
      message: "Product created sucessfully !",
      product: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    if (id > 0 && id <= 200) {
      const product = {
        id: id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };

      res.status(200).json({
        message: "Product updated",
        product: product,
      });
    } else {
      const error = new Error("Invalid input");
      error.message = "Product with id "+id+" doesn't exist.";
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

exports.deleteProduct = async (req, res, next) => {
  try {
    if (req.params.id > 0 && req.params.id <= 200) {
      res.status(200).json({
        message: "Product deleted successfully.",
      });
    } else {
      const error = new Error("Invalid input");
      error.message = "Product ID must be between 1 to 200";
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
