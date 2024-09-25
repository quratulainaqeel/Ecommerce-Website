const { Schema, model } = require('mongoose')

const OrdeSchema = new Schema(
    {
        items: {
            type: Array,
            required: true,
        },
        totalBill: {
            type: String,
            required: true,
        },
        customerAddress: {
            type: String,
            required: true,
        },
        customerContact: {
            type: String,
            required: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default:"pending",
        },
        order_at: {
            type: Date,
            default: Date.now
        }
    }
)
const Order = model('order', OrdeSchema)
module.exports = Order