jest.mock("../database", () => ({
    get: jest.fn()
}));

const db = require("../database");
const { getNutritionSummary } = require("../services/nutritionService");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("nutritionService", () => {

    describe("getNutritionSummary", () => {

        test("returns nutrition totals when meal data exists", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, {
                    total_meals: 3,
                    total_calories: 1500,
                    total_protein: 90,
                    total_carbs: 180,
                    total_fat: 50
                });
            });

            const result = await getNutritionSummary(1);

            expect(result).toEqual({
                total_meals: 3,
                total_calories: 1500,
                total_protein: 90,
                total_carbs: 180,
                total_fat: 50
            });
        });

        test("returns zero values when no meals exist", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, {
                    total_meals: 0,
                    total_calories: null,
                    total_protein: null,
                    total_carbs: null,
                    total_fat: null
                });
            });

            const result = await getNutritionSummary(99);

            expect(result).toEqual({
                total_meals: 0,
                total_calories: 0,
                total_protein: 0,
                total_carbs: 0,
                total_fat: 0
            });
        });

        test("rejects when database query fails", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(new Error("Query failed"));
            });

            await expect(
                getNutritionSummary(1)
            ).rejects.toThrow("Query failed");
        });
    });
});