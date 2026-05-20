const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getMeals,
    addMeal,
    editMeal,    
    removeMeal  
} = require("../controllers/mealController");

router.get("/", authMiddleware, getMeals);
router.post("/", authMiddleware, addMeal);
router.put("/:id", authMiddleware, editMeal);       
router.delete("/:id", authMiddleware, removeMeal);  

module.exports = router;