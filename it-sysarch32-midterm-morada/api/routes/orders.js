const express = require("express");
const router = express.Router();


const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming GET requests from /orders
router.get("/", checkAuth, OrdersController.ord_get_all_order);

router.post("/", checkAuth, OrdersController.ord_create_order);

router.get("/:orderId", checkAuth, OrdersController.ord_get_order);

router.delete("/:orderId", checkAuth, OrdersController.ord_delete_order);

module.exports = router;