const bcrypt = require('bcrypt');
const USER = require('../models/user');
const jwt = require('jsonwebtoken');

exports.userSignup = async function (req, res,next) {
    try {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const { email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "Fail",
                message: "Please enter a valid Gmail address (must end with @gmail.com)."
            });
        }

        const existingUser = await USER.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                status: "Fail",
                message: "Email already exists"
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: "Fail",
                message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one nUSERber, and one special character."
            });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const createdata = await USER.create({ ...req.body, password: hashedPassword });

        const token = jwt.sign({ id: createdata._id }, process.env.SECURE_KEY);

        res.status(200).json({
            status: "Success",
            message: "User created successfully!",
            createdata,
            token
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.userLogin = async function (req, res,next) {
    try {
        let logindata = await USER.findOne({ email: req.body.email });

        if (!logindata) {
            return res.status(404).json({
                status: "Fail",
                message: "Data not found"
            });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, logindata.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                status: "Fail",
                message: "Invalid password"
            });
        }



        res.status(200).json({
            status: "Success",
            message: "Login successfully",
            logindata,
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

exports.userViewAll = async function (req, res,next) {
    try {
        const viewdata = await USER.find();

        res.status(201).json({
            status: "Success",
            message: "User Find All successfully!",
            viewdata
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.userUpdate = async function (req, res,next) {
    try {
        req.body.password = bcrypt.hashSync(req.body.password,10)

        let id = req.params.id

        const updatedata = await USER.findByIdAndUpdate(id, req.body, { new: true });

        res.status(201).json({
            status: "Success",
            message: "User updated successfully!",
            updatedata
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.userDelete = async function (req, res, next) {
    try {
        let id = req.params.id
        
        // let user = await USER.findById(id)
        // if (!user) {
        //     throw new Error("User Data Already Deleted");
        // }

        await USER.findByIdAndDelete(id)
        
        res.status(200).json({
            status : "Succsess",
            message : "User Data Delete Successfully"
        })
    } catch (error) {
        res.status(404).json({
            status :"Fail",
            message : error.message
        })
    }
}