const ORDER = require('../models/order');
const mongoose = require('mongoose')

exports.createOrder = async (req, res) => {
    try {
        const {userId} = req.body
        let user = await ORDER.findOne({userId: userId})
        if (user) {
            throw new Error("Your Order Already Created");       
        }

        const createdata = await ORDER.create(req.body);
        if (!req.body.status) {
            req.body.status = 'Pending';
        }

        res.status(201).json({
            status: "Success",
            message: "Order Created Successfully!",
            createdata,
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.findAllOrders = async (req, res, next) => {
    try {
        let ordersData = await ORDER.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $unwind: '$productDetails',
            },
            {
                $addFields: {
                    totalPrice: { $multiply: ['$quantity', '$productDetails.price'] },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'productDetails.category',
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            {
                $unwind: '$categoryDetails',
            }
        ]);

        ordersData = await ORDER.find()
        res.status(200).json({
            status: "Success",
            message: "Orders fetched successfully!",
            data: ordersData
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.findoneOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.query.userId;

        if (!orderId) {
            return res.status(400).json({
                status: "Fail",
                message: "Order ID is required",
            });
        }

        let orders = await ORDER.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderId),
                    ...(userId && { user: mongoose.Types.ObjectId(userId) }),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$productDetails',
            },
            {
                $addFields: {
                    totalPrice: { $multiply: ['$quantity', '$productDetails.price'] },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'productDetails.category',
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            {
                $unwind: '$categoryDetails',
            },
        ]);

        let orderData = await ORDER.findById(orderId)

        res.status(200).json({
            status: "Success",
            message: "Order fetched successfully!",
            data: orderData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await ORDER.findById(orderId);

        if (!updatedOrder) {
            return res.status(404).json({
                status: "Fail",
                message: "Order not found",
            });
        }

        const updatedData = await ORDER.findByIdAndUpdate(orderId, req.body, { new: true });

        res.status(201).json({
            status: "Success",
            message: "Order updated successfully!",
            updatedData,
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        let id = req.params.id
        const order = await ORDER.findById(id);

        if (!order) {
            return res.status(404).json({
                status: "Fail",
                message: "Order not found",
            });
        }

        await ORDER.findByIdAndDelete(id);

        res.status(201).json({
            status: "Success",
            message: "Order Cancell "
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
};
