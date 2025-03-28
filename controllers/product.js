const PRODUCT = require('../models/product')

exports.createData = async (req, res) => {

    try {
        const product = req.body;

        if (!product) {
            return res.status(404).json({ error: 'Data is not found' });
        }

        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map(file => file.filename);
            product.image = fileNames;
        }

        await PRODUCT.create(product);
        res.status(201).json({
            status: "Success",
            message: "Data created successfully",
            data: product,
        });

    } catch (error) {

        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.findAllProducts = async (req, res) => {
    try {

        const viewalldata = await PRODUCT.find().populate([
            { path: 'userId' },
            { path: 'categoryId' }
        ]);

        res.status(201).json({
            status: "Success",
            message: "Product Find successfully",
            data: viewalldata
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.findoneProduct = async (req, res) => {
    try {
        let id = req.params.id
        const productdata = await PRODUCT.findById(id).populate([
            { path: 'userId' },
            { path: 'categoryId'}
        ]);
        if (!productdata) {
            return res.status(404).json({ 
                status: "Fail",
                message: 'Product not found' 
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Product Find successfully",
            data: productdata,
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        let id = req.params.id
        const updatedata = await PRODUCT.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedata) {
            return res.status(404).json({
                status: "Fail",
                message: 'Product not found' 
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Product Data Update Successfully",
            data: updatedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let id = req.params.id
        const deletedata = await PRODUCT.findByIdAndDelete(id);
        if (!deletedata) {
            return res.status(404).json({ 
                status: "Fail",
                message: 'Product not found' 
            });
        }
        res.status(201).json({
            status: "Success",
            message: "Product Delete Successfully",
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};

