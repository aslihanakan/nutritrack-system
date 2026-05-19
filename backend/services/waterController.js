const {
    addWaterLog,
    getTodayWater
} = require("../services/waterService");

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

async function addWater(req, res) {
    try {
        const amountMl = Number(req.body.amount_ml);
        const logDate = req.body.log_date || getTodayDate();

        if (!amountMl || amountMl <= 0) {
            return res.status(400).json({
                message: "Water amount must be greater than 0"
            });
        }

        const water = await addWaterLog(
            req.user.id,
            amountMl,
            logDate
        );

        res.status(201).json({
            message: "Water log added successfully",
            water
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getWaterSummary(req, res) {
    try {
        const date = req.query.date || getTodayDate();

        const summary = await getTodayWater(
            req.user.id,
            date
        );

        res.status(200).json({
            date,
            ...summary
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    addWater,
    getWaterSummary
};