const express = require('express');
const router = express.Router();
//For Image Upload
const multer = require('multer');
//
const checkAuth = require('../middleware/check-auth');
//
const ProductsController = require('../controllers/products');

//Where to save the file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().slice(0, 10) + file.originalname);
    }
});
//Files other than image/jpeg or image/png is rejected or will not save.
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
//Uploading of the file with file size limit
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Handles get req from localhost/products with images
router.get("/", ProductsController.prod_get_all_products);

// Handles post req from localhost/products
router.post("/", checkAuth, upload.single('productImage'), ProductsController.prod_create_products);

// Handles get req from localhost/products/{productId}
router.get("/:productId", ProductsController.prod_get_product);

// Handles patch req from localhost/products/{productId}
router.patch("/:productId", checkAuth, ProductsController.prod_update_product);

// Handles delete req from localhost/products/{productId}
router.delete("/:productId", checkAuth, ProductsController.prod_delete_product);

module.exports = router;
