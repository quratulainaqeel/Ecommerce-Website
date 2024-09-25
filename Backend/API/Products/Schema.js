const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviews: {
            type: Array,
           default:[]
        },
        images: [
            {
                type: String,
                required: true,
            }
        ]

    }
)

const Product = model('product', ProductSchema)

module.exports = Product