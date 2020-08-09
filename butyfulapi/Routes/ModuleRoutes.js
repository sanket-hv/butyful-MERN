const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const moduleController = require('../Controllers/ModuleController');

router.get('/',welcome, moduleController.get_all_modules);

router.get('/:ModuleId',welcome, moduleController.get_modules_ById);

router.post('/',welcome, moduleController.add_modules);

router.post('/updatemodule',welcome, moduleController.update_modules);

router.get('/deletemodule/:ModuleId',welcome, moduleController.delete_modules);


module.exports = router;