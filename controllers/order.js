const ORDER = require('../models/order');
const mongoose = require('mongoose')

exports.createOrder = async (req, res) => {
    try {
        const product = await mongoose.model('product').findById(req.body.productId);
        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        if (req.body.quantity > product.stock) {
            return res.status(400).json({
                status: "fail",
                message: `Stock not available. Only ${product.stock} units are available.`,
            });
        }

        const createdata = await ORDER.create(req.body);
        product.stock -= req.body.quantity;
        await product.save();

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
                    localField: 'productDetails.categoryId',
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            {
                $unwind: '$categoryDetails',
            }
        ]);

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
                    localField: 'userId',
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
                    localField: 'productId',
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
                    localField: 'productDetails.categoryId',
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            {
                $unwind: '$categoryDetails',
            },
        ]);

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: 'Order not found or does not belong to the specified user',
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Order fetched successfully!",
            data: orders[0],
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
                status: "fail",
                message: "Order not found",
            });
        }

        const product = await mongoose.model('product').findById(updatedOrder.productId);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        if (req.body.quantity > product.stock + updatedOrder.quantity) {
            return res.status(400).json({
                status: "fail",
                message: "Insufficient stock available",
            });
        }

        product.stock += updatedOrder.quantity - req.body.quantity;
        await product.save();


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
        const product = await mongoose.model('product').findById(order.productId);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        product.stock += order.quantity;
        await product.save();


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
