
const express = require("express");
const router = express.Router();

const {
  getFailedLoginDetections,
} = require("../controllers/detections.controller");

router.get("/failed-logins", getFailedLoginDetections);

module.exports = router;
