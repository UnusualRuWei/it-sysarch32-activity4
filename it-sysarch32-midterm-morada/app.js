//Imports of dependencies being used
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
//DB mongoDB using mongoose
const mongoose = require('mongoose');


//Import of products and orders js routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

//Connection to MongoDB
mongoose.connect('mongodb+srv://moradafranzruie:sysarch32@itsysarch32-m.48bflh8.mongodb.net/?retryWrites=true&w=majority&appName=ITSYSARCH32-M');
mongoose.Promise = global.Promise;

//For logging request to the terminal
app.use(morgan('dev'));
//parsing body received
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//For image display
app.use('/uploads',express.static('uploads'));


app.use(cors({
    origin: 'http://localhost:5001',
    credentials: true 
  }));

//This is for CORS ERROR Handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5001");
    res.header("Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods',
            'GET, POST, PATCH, DELETE, PUT');
        return res.status(200).json({});
    }
    next();
})

//app implements routes 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use("/users", userRoutes);

//Custom Error Message handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Error Response Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;