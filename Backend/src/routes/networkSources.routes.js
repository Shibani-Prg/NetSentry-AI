
const express = require("express");
const router = express.Router();

const {
  listNetworkSources,
} = require("../controllers/networkSources.controller");

router.get("/", listNetworkSources);

module.exports = router;
