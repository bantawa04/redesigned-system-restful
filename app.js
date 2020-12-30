//Import Packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

//Initialize express server
const app = express();

//Import routes
const postRoutes = require("./routes/Post");

const todoRoutes = require("./routes/Todo");

const userRoutes = require("./routes/User");

const productRoutes = require("./routes/Product");

//Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json())

//Implement Routes
app.use('/post',postRoutes);

app.use('/todo',todoRoutes);

app.use('/user', userRoutes);

app.use('/product', productRoutes);

//Catch error
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

//Run server at port 3000
app.listen('3000');
module.exports = app;