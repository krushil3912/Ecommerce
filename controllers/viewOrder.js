const VIEWORDER = require('../models/viewOrder')

exports.createViewOrder = async (req, res) => {
    try {
        if (!req.body.status) {
            req.body.status = 'Pending';
        }
        const createdata = await VIEWORDER.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "User created successfully !",
            createdata
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};


exports.getAllViewOrders = async (req, res) => {
    try {
        const viewOrders = await VIEWORDER.find().populate('user').populate('order').populate('payment');
        res.status(201).json({
            status: "Success",
            message: "User views successfully !",
            viewOrders
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};


exports.getViewOrderById = async (req, res) => {
    try {
        const viewOrder = await VIEWORDER.findById(req.params.id).populate('user').populate('order').populate('payment');
        if (!viewOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(201).json({
            status: "Success",
            message: "User view successfully !",
            viewOrder
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};


exports.updateViewOrder = async (req, res) => {
    try {
        const viewOrderupdate = await VIEWORDER.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!viewOrderupdate) {
            return res.status(404).json({ 
                status : "Fail",
                message: 'Order not found' 
            });
        }
        res.status(201).json({
            status: "Success",
            message: "User update successfully !",
            viewOrderupdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};


exports.deleteViewOrder = async (req, res) => {
    try {
        const viewOrderdelete = await VIEWORDER.findByIdAndDelete(req.params.id);
        if (!viewOrderdelete) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(201).json({
            status: "Success",
            message: "User delete successfully !",
            viewOrderdelete
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};