const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getMeals,
    addMeal,
    editMeal,    // ← deleteMeal değil
    removeMeal   // ← deleteMeal değil
} = require("../controllers/mealController");

router.get("/", authMiddleware, getMeals);
router.post("/", authMiddleware, addMeal);
router.put("/:id", authMiddleware, editMeal);       // ← Edit Meal için
router.delete("/:id", authMiddleware, removeMeal);  // ← removeMeal

module.exports = router;