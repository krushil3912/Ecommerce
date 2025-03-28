var express = require('express');
var router = express.Router();
var viewOrderController = require('../controllers/viewOrder')

/* GET home page. */
router.post('/create', viewOrderController.createViewOrder);
router.get('/find', viewOrderController.getAllViewOrders);
router.get('/findone/:id', viewOrderController.getViewOrderById);
router.patch('/update/:id', viewOrderController.updateViewOrder);
router.delete('/delete/:id', viewOrderController.deleteViewOrder);

module.exports = router;
