var express = require('express');
var router = express.Router();
let userController = require('../controllers/user')
let middleware = require('../middleware/jwt')

/* GET home page. */
router.post('/signup', userController.userSignup);
router.post('/login', userController.userLogin);
router.get('/find',middleware.Auth, userController.userViewAll);
router.patch('/update/:id',middleware.Auth, userController.userUpdate);
router.delete('/delete/:id',middleware.Auth, userController.userDelete);

module.exports = router;
