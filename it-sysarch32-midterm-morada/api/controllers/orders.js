const mongoose = require('mongoose');

const Product = require('../models/product');
const Orders = require('../models/order')

// Handles get req from localhost/orders
exports.ord_get_all_order = (req, res, next) => {
    Orders.find()
        .select("_id product quantity")
        .populate("product", "name price")
        .exec()
        .then(doc => {
            res.status(200).json({
                count: doc.length,
                order: doc.map(order => {
                    return {
                        _id: order._id,
                        product: order.product,
                        quantity: order.quantity,
                        request: {
                            type: 'GET',
                            url: 'http:\\localhost:3000/orders/' + order._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

// Handles post req from localhost/orders
exports.ord_create_order = (req, res, next) => {
    Product.findById(req.body.product)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Orders({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.product,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Order is saved",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http:\\localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// Handles get req from localhost/orders/{orderID}
exports.ord_get_order = (req, res, next) => {
    //Assign's orderId to ordId
    const orderIds = req.params.orderId;
    //Finding the data using the Schema Orders then findById function
    Orders.findById(orderIds)
        .select("_id product quantity")
        .populate('product', '_id name price')
        //Executes the find data ahead
        .exec()
        //Then outputs data or catches if any error
        .then(doc => {
            const response = {
                order: doc,
                request: {
                    type: 'GET',
                    description: 'All Products',
                    url: 'http:\\localhost:3000/orders'
                }
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};


// Handles delete req from localhost/orders/{orderID}
exports.ord_delete_order = (req, res, next) => {
    const orderIds = req.params.orderId;
    Orders.deleteOne({ _id: orderIds })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Order is deleted",
                Deleted: result.acknowledged,
                request: {
                    type: 'GET',
                    description: 'This Order with the id of ' + orderIds + ' is deleted, see all orders',
                    url: 'http:\\localhost:3000/orders/',
                    body: { productId: "ID", quantity: "Number" }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};


