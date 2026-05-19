const {
    getGoalByUser,
    saveGoal
} = require("../services/goalService");

async function getGoal(req, res) {
    try {
        const goal = await getGoalByUser(req.user.id);

        res.status(200).json(goal || {
            calorie_goal: 2000,
            protein_goal: 100,
            carbs_goal: 250,
            fat_goal: 70,
            water_goal: 2500
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function updateGoal(req, res) {
    try {
        const goal = await saveGoal(req.user.id, req.body);

        res.status(200).json({
            message: "Goals saved successfully",
            goal
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getGoal,
    updateGoal
};