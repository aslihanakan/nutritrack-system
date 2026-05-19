const db = require("../database");

function addWaterLog(userId, amountMl, logDate) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO water_logs (user_id, amount_ml, log_date)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [userId, amountMl, logDate], function (err) {
            if (err) reject(err);
            else {
                resolve({
                    id: this.lastID,
                    amount_ml: amountMl,
                    log_date: logDate
                });
            }
        });
    });
}

function getTodayWater(userId, date) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT SUM(amount_ml) as total_water
            FROM water_logs
            WHERE user_id = ? AND log_date = ?
        `;

        db.get(sql, [userId, date], (err, row) => {
            if (err) reject(err);
            else {
                resolve({
                    total_water: row.total_water || 0
                });
            }
        });
    });
}

module.exports = {
    addWaterLog,
    getTodayWater
};