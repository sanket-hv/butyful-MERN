const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const commonController = require('../Controllers/CommonController');

router.get('/getuser',welcome,commonController.get_All_User)

router.get('/getuser/:UserId',welcome,commonController.get_User_ById)

router.post('/signup',welcome,commonController.signup)

router.post('/updateuser',welcome,commonController.update_UserAndPermission);

router.get('/deleteuser/:UserId',welcome,commonController.delete_User_ById);

// router.get('/createpdf',commonController.create_PDF)

module.exports = router;