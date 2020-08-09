const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const tableNoController = require('../Controllers/TableNoController');

router.get('/',welcome, tableNoController.get_all_tableno);

router.get('/:TblId',welcome, tableNoController.get_tableno_ById);

router.post('/',welcome, tableNoController.add_tableno);

router.post('/updatetableno',welcome, tableNoController.update_tableno);

router.get('/deletetableno/:TblId',welcome, tableNoController.delete_tableno);


module.exports = router;