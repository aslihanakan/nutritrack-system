const db = require("../database");

function getMealsByUser(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM meals
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;
        db.all(sql, [userId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function createMeal(userId, mealData) {
    return new Promise((resolve, reject) => {
        const { meal_name, meal_type, calories, protein, carbs, fat, meal_date } = mealData;
        const sql = `
            INSERT INTO meals (user_id, meal_name, meal_type, calories, protein, carbs, fat, meal_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(sql, [userId, meal_name, meal_type, calories, protein, carbs, fat, meal_date],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...mealData });
            }
        );
    });
}

// ✅ Tek bir updateMeal — ikinci kopya silindi, parametre sırası controller ile eşleşiyor
function updateMeal(userId, mealId, mealData) {
    return new Promise((resolve, reject) => {
        const { meal_name, meal_type, calories, protein, carbs, fat } = mealData;
        const sql = `
            UPDATE meals
            SET meal_name = ?, meal_type = ?, calories = ?, protein = ?, carbs = ?, fat = ?
            WHERE id = ? AND user_id = ?
        `;
        db.run(sql, [meal_name, meal_type, calories, protein, carbs, fat, mealId, userId],
            function (err) {
                if (err) reject(err);
                else resolve({ message: "Meal updated successfully", updated: this.changes > 0 });
            }
        );
    });
}

function deleteMeal(userId, mealId) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM meals WHERE id = ? AND user_id = ?`;
        db.run(sql, [mealId, userId], function (err) {
            if (err) reject(err);
            else resolve({ deleted: this.changes > 0 });
        });
    });
}

module.exports = {
    getMealsByUser,
    createMeal,
    updateMeal,
    deleteMeal
};