const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const {checker} = require('../middleware/authMiddleware')


router.post('/login',userController.getUser)
router.post('/getuser',userController.getMe)
router.post('/signup',userController.createUser)
router.patch('/update',checker,userController.updateUser)

module.exports = router            