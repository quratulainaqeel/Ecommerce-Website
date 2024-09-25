const express = require('express')
const Router = express.Router()
const { sendMail, AddOrders, OrderById, AllOrders , UpdateOrder} = require('./Controller')

Router.post('/send-mail', sendMail)
Router.post('/create-order', AddOrders)
Router.get('/get-all-order', AllOrders)
Router.get('/get-order-by-id', OrderById)
Router.put('/update-order', UpdateOrder)


module.exports = Router