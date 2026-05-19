const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getGoal,
    updateGoal
} = require("../controllers/goalController");

router.get("/", authMiddleware, getGoal);
router.post("/", authMiddleware, updateGoal);
router.put("/", authMiddleware, updateGoal);

module.exports = router;