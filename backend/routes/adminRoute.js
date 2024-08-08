const adminController = require('../Controller/adminController')
const {adminChecker} = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()

router.post('/getHome',adminController.adminGet)
router.get('/updateAdminData',adminChecker,adminController.adminDataUpadate)
router.patch('/updatingUser',adminChecker,adminController.updatingUser)
router.patch('/blockUnblock',adminChecker,adminController.blockUnblock)
router.post('/adduser',adminChecker,adminController.adduser)
router.post('/search',adminChecker,adminController.search)



module.exports = router     