const express = require("express");
const router = express.Router();
const { sample } = require("../controllers/admin-controller");

router.get("/admin", sample);

module.exports = router;
