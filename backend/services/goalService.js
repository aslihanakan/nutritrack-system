const db = require("../database");

function getGoalByUser(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM goals
            WHERE user_id = ?
        `;

        db.get(sql, [userId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function saveGoal(userId, goalData) {
    return new Promise((resolve, reject) => {
        const {
            calorie_goal,
            protein_goal,
            carbs_goal,
            fat_goal,
            water_goal
        } = goalData;

        const sql = `
            INSERT INTO goals (
                user_id,
                calorie_goal,
                protein_goal,
                carbs_goal,
                fat_goal,
                water_goal
            )
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id) DO UPDATE SET
                calorie_goal = excluded.calorie_goal,
                protein_goal = excluded.protein_goal,
                carbs_goal = excluded.carbs_goal,
                fat_goal = excluded.fat_goal,
                water_goal = excluded.water_goal,
                updated_at = CURRENT_TIMESTAMP
        `;

        db.run(
            sql,
            [
                userId,
                calorie_goal,
                protein_goal,
                carbs_goal || 0,
                fat_goal || 0,
                water_goal
            ],
            function (err) {
                if (err) reject(err);
                else {
                    resolve({
                        calorie_goal,
                        protein_goal,
                        carbs_goal: carbs_goal || 0,
                        fat_goal: fat_goal || 0,
                        water_goal
                    });
                }
            }
        );
    });
}

module.exports = {
    getGoalByUser,
    saveGoal
};