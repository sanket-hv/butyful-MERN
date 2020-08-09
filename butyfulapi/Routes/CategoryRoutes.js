const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const categoryController = require('../Controllers/CategoryController');

router.get('/',welcome,categoryController.get_all_Category)

router.get('/:CategoryId',welcome,categoryController.get_Category_ById)

router.post('/',welcome,categoryController.add_category)

router.post('/updatecategory',welcome,categoryController.update_category)

router.get('/deletecategory/:CategoryId',welcome,categoryController.delete_Category_ById)

module.exports = router;