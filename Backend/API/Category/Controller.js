require('dotenv').config()
const Category = require('./Schema')
const { connect } = require('mongoose')

const CreateCategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body;

    if (!CategoryName || !CategoryImage) {
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

            const categoryExist = await Category.exists({ CategoryName })

            if (categoryExist) {
                return res.status(400).json({
                    Message: "Category already exists"
                })
            } else {
                await Category.create({ CategoryName, CategoryImage })
                const allCategories = await Category.find()

                res.status(201).json({
                    message: "Category Added Successfully",
                    Category: allCategories
                });
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Database Connection Failed"
            });
        }
    }
}

const getAllCategory = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const AllCategory = await Category.find({})

        res.status(201).json({
            Category: AllCategory
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        });
    }
}

const getCategoryByName = async (req, res) => {

    const { CategoryName } = req.query

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const categorybyname = await Category.findOne({ CategoryName })

        res.status(200).json({
            Category: categorybyname
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        });
    }
}

const getCategoryById = async (req, res) => {
    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")

        const category = await Category.findOne({ _id })

        res.status(201).json({
            Category: category
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Database Connection Failed"
        });
    }
}

const UpdateCategory = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body

    if (!CategoryName) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }
    else {
        const filter = { CategoryName };
        const update = { CategoryImage };

        try {
            await connect(process.env.MONGO_URI)
            console.log("DB CONNECTED")

            await Category.findOneAndUpdate(filter, update, {
                new: true
            });

            const categories = await Category.find()

            res.status(200).json({
                Message: "Update Sucessfully",
                Category: categories
            })

        }
        catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Database Connection Failed"
            })
        }
    }
}

const DeleteCategory = async (req, res) => {

    const { _id } = req.body

    if (!_id) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }
    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("DB CONNECTED")

            await Category.findOneAndDelete({ _id })
            const categories = await Category.find()

            res.status(200).json({
                message: "Category Delete sucessflly",
                Category: categories
            })

        }
        catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Database Connection Failed"
            })
        }
    }

}

module.exports = { CreateCategory, getAllCategory, getCategoryById, getCategoryByName, UpdateCategory, DeleteCategory }