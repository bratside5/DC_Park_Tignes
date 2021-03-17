const express = require("express");
const parkController = require("../../controllers/ParkData/ParkData_Controller");
const router = express.Router();

// Get all posts
router.get("/today", parkController.park_today);
router.get("/yesterday", parkController.park_yesterday);
router.get("/last-week", parkController.park_last_week);
router.get("/dates-between", parkController.park_dates_between);

module.exports = router;
