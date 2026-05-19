const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addWater,
    getWaterSummary
} = require("../controllers/waterController");

router.post("/", authMiddleware, addWater);
router.get("/today", authMiddleware, getWaterSummary);

module.exports = router;