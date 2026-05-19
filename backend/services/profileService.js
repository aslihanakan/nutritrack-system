const db = require("../database");

const {
    calculateBMI,
    getBMIStatus,
    calculateIdealWeightRange,
    calculateDailyCalorieNeed,
    getHealthSuggestion
} = require("./healthService");

function getProfileByUser(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM user_profiles
            WHERE user_id = ?
        `;

        db.get(sql, [userId], (err, profile) => {
            if (err) {
                reject(err);
                return;
            }

            if (!profile) {
                resolve(null);
                return;
            }

            const bmi = calculateBMI(profile.weight_kg, profile.height_cm);
            const idealRange = calculateIdealWeightRange(profile.height_cm);
            const dailyCalories = calculateDailyCalorieNeed(
                profile.gender,
                profile.weight_kg,
                profile.height_cm,
                profile.age,
                profile.activity_level
            );

            resolve({
                ...profile,
                bmi,
                bmi_status: getBMIStatus(bmi),
                ideal_weight_range: idealRange,
                daily_calorie_need: dailyCalories,
                suggestion: getHealthSuggestion(bmi)
            });
        });
    });
}

function saveProfile(userId, profileData) {
    return new Promise((resolve, reject) => {
        const {
            age,
            gender,
            height_cm,
            weight_kg,
            activity_level,
            target_weight
        } = profileData;

        const sql = `
            INSERT INTO user_profiles (
                user_id,
                age,
                gender,
                height_cm,
                weight_kg,
                activity_level,
                target_weight
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id) DO UPDATE SET
                age = excluded.age,
                gender = excluded.gender,
                height_cm = excluded.height_cm,
                weight_kg = excluded.weight_kg,
                activity_level = excluded.activity_level,
                target_weight = excluded.target_weight,
                updated_at = CURRENT_TIMESTAMP
        `;

        db.run(
            sql,
            [
                userId,
                age,
                gender,
                height_cm,
                weight_kg,
                activity_level,
                target_weight
            ],
            async function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                const updatedProfile = await getProfileByUser(userId);
                resolve(updatedProfile);
            }
        );
    });
}

module.exports = {
    getProfileByUser,
    saveProfile
};