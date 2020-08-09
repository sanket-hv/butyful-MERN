const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const itemMasterController = require('../Controllers/ItemMasterController');

router.get('/', welcome,itemMasterController.get_all_items);

router.get('/:ItemId', welcome,itemMasterController.get_items_ById);

router.post('/',welcome,itemMasterController.add_itemMaster);

router.post('/updateitems',welcome,itemMasterController.update_itemMaster);

router.get('/deleteitem/:ItemId',welcome,itemMasterController.delete_itemMaster);

module.exports = router;