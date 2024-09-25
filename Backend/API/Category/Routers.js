const express = require('express')
const Router = express.Router()
const {CreateCategory, getAllCategory, getCategoryById, getCategoryByName, UpdateCategory, DeleteCategory} = require('./Controller')

Router.post('/create-category', CreateCategory)
Router.get('/get-all-category', getAllCategory)
Router.get('/get-category-by-id', getCategoryById)
Router.get("/get-category-by-name", getCategoryByName)
Router.put("/update-category", UpdateCategory)
Router.delete("/delete-category", DeleteCategory)

module.exports = Router