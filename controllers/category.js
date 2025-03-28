const CATEGORY = require('../models/category')

exports.categoryCreate = async function (req, res, body) {
    try {
        const categoryData = await CATEGORY.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "Category Created Successfully !",
            data : categoryData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.categoryFindAll = async function (req, res, body) {
    try {
        const categoryData = await CATEGORY.find()

        res.status(201).json({
            status: "Success",
            message: "Find All Category Successfully",
            data : categoryData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.categoryFind = async function (req, res, body) {
    try {
        let id = req.params.id
        let categoryData = await CATEGORY.findById(id)

        if (!categoryData) {
            res.status(404).json({
                status: "Fail",
                message: "Category Not Found"
            })
        }

        res.status(201).json({
            status: "Successfull",
            message: "Find One Category Successfully",
            data : categoryData
        })

    } catch (error) {
        res.status(201).json({
            status: "Fail",
            message: error.message,
        })
    }
}

exports.categoryUpdate = async function (req, res, body) {
    try {
        let id = req.params.id
        const categoryData = await CATEGORY.findByIdAndUpdate(id, req.body, { new: true })

        res.status(201).json({
            status: "Success",
            message: "Category Update successfully !",
            data : categoryData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.categoryDelete = async function (req, res, body) {
    try {
        let id = req.params.id
        let category = await CATEGORY.findById(id)
        if (!category) {
            throw new Error("This Category Already Deleted");
        }

        await CATEGORY.findByIdAndDelete(id)

        res.status(201).json({
            status: "Success",
            message: "Category Delete Successfully !",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}