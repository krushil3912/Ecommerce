var express = require('express');
var router = express.Router();
let categoryController = require('../controllers/category')

/* GET home page. */
router.post('/create', categoryController.categoryCreate);
router.get('/find', categoryController.categoryFindAll);
router.get('/findone/:id', categoryController.categoryFind);
router.patch('/update/:id', categoryController.categoryUpdate);
router.delete('/delete/:id', categoryController.categoryDelete);

module.exports = router;
