const {
    getMealsByUser,
    createMeal,
    updateMeal, // Servisten gelen metot ismi olarak kalıyor
    deleteMeal
} = require("../services/mealService");

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

// Güncelleme işlemini yapan asıl fonksiyonun bu
async function editMeal(req, res) {
    try {
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

// NOT: En alttaki hatalı "async function updateMeal" bloğu tamamen kaldırıldı.

module.exports = {
    getMeals,
    addMeal,
    editMeal, // Routes dosyasında update işlemi için bu ismi çağıracaksın
    removeMeal
};