var express = require('express');
var router = express.Router();
var productController = require('../controllers/product')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.filename)
  }
})

const upload = multer({ storage: storage })

router.post('/create', upload.array('image', 2), productController.createData);
router.get('/find', productController.findAllProducts)
router.get('/findone/:id', productController.findoneProduct)
router.patch('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)


module.exports = router;
