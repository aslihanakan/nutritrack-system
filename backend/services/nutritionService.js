const db = require("../database");

function getNutritionSummary(userId) {
    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                COUNT(*) as total_meals,
                SUM(calories) as total_calories,
                SUM(protein) as total_protein,
                SUM(carbs) as total_carbs,
                SUM(fat) as total_fat
            FROM meals
            WHERE user_id = ?
        `;

        db.get(sql, [userId], (err, row) => {

            if (err) {
                reject(err);
            } else {

                resolve({
                    total_meals: row.total_meals || 0,
                    total_calories: row.total_calories || 0,
                    total_protein: row.total_protein || 0,
                    total_carbs: row.total_carbs || 0,
                    total_fat: row.total_fat || 0
                });
            }
        });
    });
}

module.exports = {
    getNutritionSummary
};