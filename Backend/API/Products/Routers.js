const express = require('express')
const Router = express.Router()
const {CreateProduct, getAllProduct,  getProductByBrand, getProductById, getProductByCategory, UpdateProduct, DeleteProduct, SearchProduct, ProductReviews} = require('./Controller')


Router.post('/create-product', CreateProduct)
Router.get('/get-all-product', getAllProduct)
Router.get('/get-product-by-brand', getProductByBrand)
Router.get('/get-product-by-id', getProductById)
Router.get('/get-product-by-category', getProductByCategory)
Router.get('/get-product-by-search/:item', SearchProduct)
Router.post('/review-product', ProductReviews)
Router.put('/update-product', UpdateProduct)
Router.delete('/delete-product', DeleteProduct)
 
module.exports = Router