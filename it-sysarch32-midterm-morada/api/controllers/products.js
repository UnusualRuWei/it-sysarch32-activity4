const mongoose = require('mongoose');

const Product = require('../models/product');

exports.prod_get_all_products = (req, res, next) => {
    Product.find()
        .select("_id name price productImage")
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                product: doc.map(prod => {
                    return {
                        _id: prod._id,
                        name: prod.name,
                        price: prod.price,
                        productImage: prod.productImage,
                        request: {
                            type: 'GET',
                            url: 'http:\\localhost:3000/products/' + prod._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.prod_create_products = (req, res, next) => {
    //Creates new product from Model Product
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    //Saves the product Then Outputs Success and the Product Detail then catches any error on POST
    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Product is saved",
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price
                },
                request: {
                    type: 'GET',
                    url: 'http:\\localhost:3000/products/' + result._id
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

exports.prod_get_product = (req, res, next) => {
    //Assign's productID to prodId
    const prodId = req.params.productId;
    //Finding the data using the Schema Product then findById function
    Product.findById(prodId)
        .select("_id name price productImage")
        //Executes the find data ahead
        .exec()
        //Then outputs data or catches if any error
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products'
                    }
                });
              } else {
                res
                  .status(404)
                  .json({ message: "No valid entry found for provided ID" });
              }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.prod_update_product = (req, res, next) => {
    const prodId = req.params.productId;
    Product.updateOne({ _id: prodId }, { $set: req.body })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Successfully updated",
                Updated: result.acknowledged,
                request: {
                    type: 'GET',
                    url: 'http:\\localhost:3000/products/' + prodId
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.prod_delete_product = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteOne({ _id: prodId })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Product is deleted",
                Deleted: result.acknowledged,
                request: {
                    type: 'GET',
                    description: 'This product with the id of ' + prodId + ' is deleted, see all products',
                    url: 'http:\\localhost:3000/products/',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

