const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const dashboardController = require('../Controllers/DashboardController');

router.get('/lastproductiontime',welcome,dashboardController.get_todayProduction_upto);

router.get('/todaytotalmasterbox',welcome,dashboardController.get_todayTotalMasterBOx);

router.get('/totalmasterbox',welcome,dashboardController.get_TotalMasterBOx);

router.get('/fgstockreport',welcome,dashboardController.get_FG_Stock_Report);

router.get('/productiontrend',welcome,dashboardController.get_ProductionTrend);

router.get('/productiontrendbytable/:tableno',welcome,dashboardController.get_ProductionTrendTableWise);

router.get('/tablewiseproduction',welcome,dashboardController.get_todayTotalTableWiseProduction);

router.post('/itemsbycategory',welcome,dashboardController.get_Items_By_Category);

router.post('/searchbyitemandcategory',welcome,dashboardController.search_By_Description_and_Category);

module.exports = router;