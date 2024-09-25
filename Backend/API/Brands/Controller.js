require('dotenv').config()
const Brand = require('./Schema')
const { connect } = require('mongoose')

const createBrand = async (req, res) => {

    const { BrandName, BrandImage } = req.body

    if (!BrandName || !BrandImage) {
        res.status(403).json(
            {
                message: "Missing Required Field"
            }
        )
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("DB CONNECTED")

            const BrandExist = await Brand.exists({ BrandName })

            if (BrandExist) {
                res.status(400).json({
                    Message: "Brand Already Exists"
                })
            }

            else {
                await Brand.create({ BrandName, BrandImage })
                const brands = await Brand.find()

                res.status(201).json({
                    message: "Brand Added Successfully",
                    Brand: brands
                })
            }

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Database Connection Failed"
            })
        }
    }


}

const getAllBrand = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const brands = await Brand.find()

        res.status(200).json({
            Brand: brands
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

const getBrandById = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const brand = await Brand.findOne({ _id })

        res.status(200).json({
            Brand: brand
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

const getBrandByName = async (req, res) => {
    const { BrandName } = req.query

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const brand = await Brand.findOne({ BrandName })

        res.status(200).json({
            Brand: brand
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

const UpdateBrand = async (req, res) => {
    const { _id, BrandName, BrandImage } = req.body

    if (!BrandName) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }
    else {
        const filter = { BrandName }
        const update = { BrandImage }

        try {
            await connect(process.env.MONGO_URI)
            console.log("DB CONNECTED")

            await Brand.findOneAndUpdate(filter, update, {
                new: true
            })

            const brand = await Brand.find()

            res.status(200).json({
                Message: "Update Sucessfully",
                Brand: brand
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Database Connection Failed"
            })
        }
    }
}

const DeleteBrand = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        await Brand.findOneAndDelete({ _id })
        const brand = await Brand.find()

        res.status(200).json({
            message: "delete Sucessfully",
            Brand: brand
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        })
    }
}

module.exports = { createBrand, getAllBrand, getBrandById, getBrandByName, UpdateBrand, DeleteBrand }