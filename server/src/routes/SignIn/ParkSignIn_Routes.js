const express = require("express");
const parkController = require("../../controllers/SignIn/ParkSignIn_Controller");
const router = express.Router();

// Get all posts
router.get("/", parkController.park_index);
router.get("/latest", parkController.park_latest);
router.get("/:id", parkController.park_details);

router.post("/create", parkController.park_create_post);
router.delete("/:id", parkController.park_delete);

module.exports = router;
