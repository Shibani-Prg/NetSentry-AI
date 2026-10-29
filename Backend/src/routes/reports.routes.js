const express = require("express");
const router = express.Router();

const { getReport } = require("../controllers/reports.controller");

router.get("/", getReport);

module.exports = router;