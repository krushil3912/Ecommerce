var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order')

router.post('/create', orderController.createOrder);
router.get('/find', orderController.findAllOrders);
router.get('/findone/:id', orderController.findoneOrder);
router.patch('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);


module.exports = router;
