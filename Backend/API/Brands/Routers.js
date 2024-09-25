const express = require('express')
const Router = express.Router()
const { createBrand, getAllBrand, getBrandById, getBrandByName, UpdateBrand, DeleteBrand } = require('./Controller')

Router.post('/create-brand', createBrand)
Router.get('/get-all-brand', getAllBrand)
Router.get('/get-brand-by-id', getBrandById)
Router.get('/get-brand-by-name', getBrandByName)
Router.put('/update-brand', UpdateBrand)
Router.delete('/delete-brand', DeleteBrand)

module.exports = Router
