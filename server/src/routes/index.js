const express = require("express");
const router = express.Router();

const adminRoute = require("./admin");
const customerRoute = require("./customer");

router.use("/admin", adminRoute);
router.use("/customer", customerRoute);

module.exports = router;
