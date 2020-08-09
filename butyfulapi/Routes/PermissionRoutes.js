const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const permissionController = require('../Controllers/PermissionController');

router.get('/',welcome,permissionController.get_all_permission);

router.get('/:UserId',welcome,permissionController.get_permissiontbl_By_userId);


module.exports = router;