function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    return Number((weightKg / (heightM * heightM)).toFixed(1));
}

function getBMIStatus(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

function calculateIdealWeightRange(heightCm) {
    const heightM = heightCm / 100;

    const min = 18.5 * heightM * heightM;
    const max = 24.9 * heightM * heightM;

    return {
        min: Number(min.toFixed(1)),
        max: Number(max.toFixed(1))
    };
}

function calculateDailyCalorieNeed(gender, weightKg, heightCm, age, activityLevel) {
    let bmr;

    if (gender === "female") {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    }

    const activityMultipliers = {
        low: 1.2,
        medium: 1.55,
        high: 1.725
    };

    const multiplier = activityMultipliers[activityLevel] || 1.2;

    return Math.round(bmr * multiplier);
}

function getHealthSuggestion(bmi) {
    if (bmi < 18.5) {
        return "You may need to increase your calorie intake in a balanced way.";
    }

    if (bmi < 25) {
        return "Your BMI is in the normal range. Keep maintaining your habits.";
    }

    if (bmi < 30) {
        return "A balanced diet and regular exercise may help you reach a healthier range.";
    }

    return "It may be useful to follow a controlled nutrition and exercise plan.";
}

module.exports = {
    calculateBMI,
    getBMIStatus,
    calculateIdealWeightRange,
    calculateDailyCalorieNeed,
    getHealthSuggestion
};