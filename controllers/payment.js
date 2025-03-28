const nodemailer = require('nodemailer');
const PAYMENT = require('../models/payment');
const USER = require('../models/user');
const ORDER = require('../models/order')

exports.paymentCreate = async (req, res) => {
  try {
    const order = await ORDER.findById(req.body.order).populate('productId'); 

    if (!order) {
      return res.status(404).json({
        status: "Fail",
        message: "Order not found."
      });
    }

    const totalPrice = order.quantity * order.product.price;

    if (req.body.amount == totalPrice) {

    }
    else {
      return res.status(400).json({
        status: "Fail",
        message: `Amount mismatch: expected ${totalPrice} but got ${req.body.amount}`
      });

    }

    const paymentData = { ...req.body, amount: totalPrice };
    if (!req.body.status) {
      req.body.status = 'Pending';
    }
    if (!req.body.buyNow) {
      req.body.buyNow = 'false';
    }
    const createdPayment = await PAYMENT.create(paymentData);

    const user = await USER.findById(req.body.user);

    if (user) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dhameliyakrushil2023@gmail.com',
          pass: 'pwciyoszdvpkobpu'
        }
      });

      const mailOptions = {
        from: 'dhameliyakrushil2023@gmail.com',
        to: user.email,
        subject: 'Payment Confirmation',
        text: `Dear ${user.firstname} ${user.lastname},\n\nYour payment of ₹${req.body.amount} has been successfully processed.\n\nThank you for your payment!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email: ', error);
          return res.status(500).json({
            status: "Fail",
            message: "Payment created, but email could not be sent."
          });
        }
      });
    }

    res.status(201).json({
      status: "Success",
      message: "Payment created successfully!",
      createdPayment
    });

  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    });
  }
};

exports.paymentFindOne = async (req, res) => {
  try {
    const payment = await PAYMENT.findById(req.params.id).populate('userId').populate('orderId');
    if (!payment) {
      return res.status(404).json({ 
        status: "Fail",
        message: 'Payment not found' 
      });
    }
    res.status(201).json({
      status: "Success",
      message: "User view successfully !",
      payment
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
};

exports.paymentFindAll = async (req, res) => {
  try {
    const payments = await PAYMENT.find().populate('user').populate('order');
    res.status(201).json({
      status: "Success",
      message: "User views successfully !",
      payments
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};

exports.paymentUpdate = async (req, res) => {
  try {
    const paymentupdate = await PAYMENT.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) {
      return res.status(404).json({ 
        status: "Fail",
        message: 'Payment not found'
       });
    }
    res.status(201).json({
      status: "Success",
      message: "User update successfully !",
      paymentupdate
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};


exports.paymentDelete = async (req, res) => {
  try {
    const paymentdelete = await PAYMENT.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ 
        status: "Fail",
        message: 'Payment not found' 
      });
    }
    res.status(201).json({
      status: "Success",
      message: "User delete successfully !",
      paymentdelete
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};