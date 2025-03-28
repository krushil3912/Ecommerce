var express = require('express');
var router = express.Router();
const paymentController = require('../controllers/payment')

/* GET home page. */
router.post('/create', paymentController.paymentCreate);
router.get('/findone/:id', paymentController.paymentFindOne);
router.get('/find', paymentController.paymentFindAll);
router.patch('/update/:id', paymentController.paymentUpdate);
router.delete('delete/:id', paymentController.paymentDelete);

module.exports = router;
