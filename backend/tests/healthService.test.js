const {
    calculateBMI,
    getBMIStatus,
    calculateIdealWeightRange,
    calculateDailyCalorieNeed,
    getHealthSuggestion
} = require("../services/healthService");

describe("healthService", () => {

    describe("calculateBMI", () => {
        test("calculates BMI correctly", () => {
            expect(calculateBMI(70, 175)).toBeCloseTo(22.9, 1);
        });
    });

    describe("getBMIStatus", () => {
        test("returns correct BMI categories", () => {
            expect(getBMIStatus(17.5)).toBe("Underweight");
            expect(getBMIStatus(22.0)).toBe("Normal");
            expect(getBMIStatus(27.0)).toBe("Overweight");
            expect(getBMIStatus(32.0)).toBe("Obese");
        });
    });

    describe("calculateIdealWeightRange", () => {
        test("returns ideal weight range with min and max values", () => {
            const result = calculateIdealWeightRange(170);

            expect(result).toHaveProperty("min");
            expect(result).toHaveProperty("max");
            expect(result.min).toBeLessThan(result.max);
        });
    });

    describe("calculateDailyCalorieNeed", () => {
        test("calculates daily calorie need for male user", () => {
            const result = calculateDailyCalorieNeed("male", 70, 175, 25, "low");

            expect(result).toBe(2009);
        });

        test("calculates daily calorie need for female user", () => {
            const result = calculateDailyCalorieNeed("female", 60, 165, 30, "medium");

            expect(result).toBe(2046);
        });

        test("returns higher calorie need for higher activity level", () => {
            const low = calculateDailyCalorieNeed("male", 80, 180, 28, "low");
            const high = calculateDailyCalorieNeed("male", 80, 180, 28, "high");

            expect(high).toBeGreaterThan(low);
        });
    });

    describe("getHealthSuggestion", () => {
        test("returns suggestions for different BMI levels", () => {
            expect(getHealthSuggestion(17.0)).toMatch(/calorie/i);
            expect(getHealthSuggestion(22.0)).toMatch(/normal/i);
            expect(getHealthSuggestion(27.0)).toMatch(/diet|exercise|balanced/i);
            expect(getHealthSuggestion(32.0)).toMatch(/controlled|nutrition|exercise/i);
        });

        test("returns suggestion as a string", () => {
            expect(typeof getHealthSuggestion(22.0)).toBe("string");
        });
    });
});