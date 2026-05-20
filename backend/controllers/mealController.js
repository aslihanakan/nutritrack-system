const {
    getMealsByUser,
    createMeal,
    updateMeal,
    deleteMeal
} = require("../services/mealService");

const {
    validateMeal
} = require("../utils/validation");

async function getMeals(req, res) {
    try {
        const meals = await getMealsByUser(req.user.id);
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function addMeal(req, res) {
    try {
        const today = new Date().toISOString().split("T")[0];

        const mealData = {
            ...req.body,
            meal_date: req.body.meal_date || today
        };

        const validationError = validateMeal(mealData);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const meal = await createMeal(req.user.id, mealData);

        res.status(201).json({
            message: "Meal added successfully",
            meal
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function editMeal(req, res) {
    try {
        const validationError = validateMeal(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const result = await updateMeal(
            req.user.id,
            req.params.id,
            req.body
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function removeMeal(req, res) {
    try {
        const result = await deleteMeal(
            req.user.id,
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getMeals,
    addMeal,
    editMeal,
    removeMeal
};