const {
    getNutritionSummary
} = require("../services/nutritionService");

async function getSummary(req, res) {

    try {

        const summary = await getNutritionSummary(
            req.user.id
        );

        res.status(200).json(summary);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getSummary
};