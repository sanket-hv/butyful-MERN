const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const ProductionController = require('../Controllers/ProductionController');

router.get('/',welcome,ProductionController.get_all_production);

router.get('/:ProductionId', welcome,ProductionController.get_production_ById);

router.post('/',welcome,ProductionController.add_Production);

router.post('/updateproduction',welcome,ProductionController.update_production);

router.get('/deleteproduction/:ProductionId',welcome,ProductionController.delete_production);

module.exports = router;