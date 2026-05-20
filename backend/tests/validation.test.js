const {
    validateRegister,
    validateLogin,
    validateMeal,
    validateGoal,
    validateProfile,
    validateWater
} = require("../utils/validation");

describe("validation", () => {

    describe("validateRegister", () => {

        test("returns null for valid registration data", () => {
            expect(
                validateRegister({
                    username: "testuser",
                    email: "test@example.com",
                    password: "123456"
                })
            ).toBeNull();
        });

        test("returns error for missing fields", () => {
            expect(validateRegister({})).toBe("All fields are required");
        });

        test("returns error for short password", () => {
            expect(
                validateRegister({
                    username: "test",
                    email: "test@example.com",
                    password: "123"
                })
            ).toBe("Password must be at least 6 characters");
        });
    });

    describe("validateLogin", () => {

        test("returns null for valid login data", () => {
            expect(
                validateLogin({
                    email: "test@example.com",
                    password: "123456"
                })
            ).toBeNull();
        });

        test("returns error for missing fields", () => {
            expect(validateLogin({}))
                .toBe("Email and password are required");
        });
    });

    describe("validateMeal", () => {

        test("returns null for valid meal data", () => {
            expect(
                validateMeal({
                    meal_name: "Chicken Salad",
                    meal_type: "Lunch",
                    calories: 350,
                    protein: 30,
                    carbs: 20,
                    fat: 10
                })
            ).toBeNull();
        });

        test("returns error for invalid meal data", () => {
            expect(
                validateMeal({
                    meal_name: "",
                    meal_type: "Invalid"
                })
            ).not.toBeNull();
        });
    });

    describe("validateGoal", () => {

        test("returns null for valid goal data", () => {
            expect(
                validateGoal({
                    calorie_goal: 2000,
                    protein_goal: 100,
                    carbs_goal: 250,
                    fat_goal: 70,
                    water_goal: 2500
                })
            ).toBeNull();
        });

        test("returns error for invalid goal values", () => {
            expect(
                validateGoal({
                    calorie_goal: -1,
                    protein_goal: 100,
                    carbs_goal: 250,
                    fat_goal: 70,
                    water_goal: 2500
                })
            ).not.toBeNull();
        });
    });

    describe("validateProfile", () => {

        test("returns null for valid profile data", () => {
            expect(
                validateProfile({
                    age: 22,
                    gender: "female",
                    height_cm: 165,
                    weight_kg: 58,
                    activity_level: "medium",
                    target_weight: 54
                })
            ).toBeNull();
        });

        test("returns error for invalid profile data", () => {
            expect(
                validateProfile({
                    age: -1,
                    gender: "unknown"
                })
            ).not.toBeNull();
        });
    });

    describe("validateWater", () => {

        test("returns null for valid water amount", () => {
            expect(
                validateWater({
                    amount_ml: 500
                })
            ).toBeNull();
        });

        test("returns error for invalid water amount", () => {
            expect(
                validateWater({
                    amount_ml: -100
                })
            ).not.toBeNull();
        });
    });
});