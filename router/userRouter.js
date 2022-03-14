const express = require('express')
const { userController } = require('../controller')
const router = express.Router()



// create user
router.post('/users', userController.CreateUser)
// get all user
router.get('/users', userController.GetAllUsers)
// get user by id
router.get('/users/:id', userController.GetUserById)
// edit user
router.put('/users/:id', userController.EditUser)
// delete
router.delete('/users/:id', userController.DeleteUser)

module.exports = router