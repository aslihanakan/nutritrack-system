function isMissing(value) {
    return value === undefined || value === null || value === "";
}

function isNegative(value) {
    return Number(value) < 0;
}

function isNotPositive(value) {
    return Number(value) <= 0;
}

function isInvalidNumber(value) {
    return isNaN(Number(value));
}

function validateRegister(data) {
    const { username, email, password } = data;

    if (!username || !email || !password) {
        return "All fields are required";
    }

    if (!email.includes("@")) {
        return "Please enter a valid email address";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters";
    }

    return null;
}

function validateLogin(data) {
    const { email, password } = data;

    if (!email || !password) {
        return "Email and password are required";
    }

    if (!email.includes("@")) {
        return "Please enter a valid email address";
    }

    return null;
}

function validateMeal(data) {
    const { meal_name, meal_type, calories, protein, carbs, fat } = data;

    const validMealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

    if (!meal_name || meal_name.trim() === "") {
        return "Meal name is required";
    }

    if (!meal_type || !validMealTypes.includes(meal_type)) {
        return "Invalid meal type";
    }

    if (
        isMissing(calories) ||
        isMissing(protein) ||
        isMissing(carbs) ||
        isMissing(fat)
    ) {
        return "All nutrition values are required";
    }

    if (
        isInvalidNumber(calories) ||
        isInvalidNumber(protein) ||
        isInvalidNumber(carbs) ||
        isInvalidNumber(fat)
    ) {
        return "Nutrition values must be valid numbers";
    }

    if (
        isNegative(calories) ||
        isNegative(protein) ||
        isNegative(carbs) ||
        isNegative(fat)
    ) {
        return "Nutrition values cannot be negative";
    }

    return null;
}

function validateGoal(data) {
    const { calorie_goal, protein_goal, carbs_goal, fat_goal, water_goal } = data;

    if (
        isMissing(calorie_goal) ||
        isMissing(protein_goal) ||
        isMissing(carbs_goal) ||
        isMissing(fat_goal) ||
        isMissing(water_goal)
    ) {
        return "All goal values are required";
    }

    if (
        isInvalidNumber(calorie_goal) ||
        isInvalidNumber(protein_goal) ||
        isInvalidNumber(carbs_goal) ||
        isInvalidNumber(fat_goal) ||
        isInvalidNumber(water_goal)
    ) {
        return "Goal values must be valid numbers";
    }

    if (
        isNotPositive(calorie_goal) ||
        isNegative(protein_goal) ||
        isNegative(carbs_goal) ||
        isNegative(fat_goal) ||
        isNotPositive(water_goal)
    ) {
        return "Goal values must be valid positive numbers";
    }

    return null;
}

function validateProfile(data) {
    const {
        age,
        gender,
        height_cm,
        weight_kg,
        activity_level,
        target_weight
    } = data;

    const validGenders = ["female", "male"];
    const validActivityLevels = ["low", "medium", "high"];

    if (
        isMissing(age) ||
        isMissing(gender) ||
        isMissing(height_cm) ||
        isMissing(weight_kg) ||
        isMissing(activity_level) ||
        isMissing(target_weight)
    ) {
        return "All profile fields are required";
    }

    if (!validGenders.includes(gender)) {
        return "Invalid gender";
    }

    if (!validActivityLevels.includes(activity_level)) {
        return "Invalid activity level";
    }

    if (
        isInvalidNumber(age) ||
        isInvalidNumber(height_cm) ||
        isInvalidNumber(weight_kg) ||
        isInvalidNumber(target_weight)
    ) {
        return "Profile values must be valid numbers";
    }

    if (
        isNotPositive(age) ||
        isNotPositive(height_cm) ||
        isNotPositive(weight_kg) ||
        isNotPositive(target_weight)
    ) {
        return "Profile values must be valid positive numbers";
    }

    return null;
}

function validateWater(data) {
    const { amount_ml } = data;

    if (isMissing(amount_ml)) {
        return "Water amount is required";
    }

    if (isInvalidNumber(amount_ml)) {
        return "Water amount must be a valid number";
    }

    if (isNotPositive(amount_ml)) {
        return "Water amount must be greater than zero";
    }

    return null;
}

module.exports = {
    validateRegister,
    validateLogin,
    validateMeal,
    validateGoal,
    validateProfile,
    validateWater
};