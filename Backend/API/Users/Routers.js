const express = require('express')
const Router = express.Router()
const {Login, Signup,  getAllUser, getUserById, getuserbyEmail, DeleteUser, UpdateUser} = require('./Controller')

Router.post('/login', Login)
Router.post('/signup', Signup)
Router.get('/get-all-user', getAllUser)
Router.get('/get-user-by-id', getUserById)
Router.get('/get-user-by-email', getuserbyEmail)
Router.delete('/delete-user', DeleteUser)
Router.put('/update-user', UpdateUser)

module.exports = Router