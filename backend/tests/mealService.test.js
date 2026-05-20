jest.mock("../database", () => ({
    all: jest.fn(),
    run: jest.fn()
}));

const db = require("../database");

const {
    getMealsByUser,
    createMeal,
    updateMeal,
    deleteMeal
} = require("../services/mealService");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("mealService", () => {

    describe("getMealsByUser", () => {

        test("returns meals belonging to the user", async () => {
            const mockMeals = [
                { id: 1, meal_name: "Breakfast", calories: 400 },
                { id: 2, meal_name: "Lunch", calories: 600 }
            ];

            db.all.mockImplementation((sql, params, callback) => {
                callback(null, mockMeals);
            });

            const result = await getMealsByUser(1);

            expect(result).toEqual(mockMeals);
        });

        test("returns empty array when no meals exist", async () => {
            db.all.mockImplementation((sql, params, callback) => {
                callback(null, []);
            });

            const result = await getMealsByUser(99);

            expect(result).toEqual([]);
        });

        test("rejects when database error occurs", async () => {
            db.all.mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
            });

            await expect(getMealsByUser(1)).rejects.toThrow("DB error");
        });
    });

    describe("createMeal", () => {

        const mealData = {
            meal_name: "Chicken Salad",
            meal_type: "Lunch",
            calories: 350,
            protein: 30,
            carbs: 20,
            fat: 10,
            meal_date: "2026-05-19"
        };

        test("creates a meal successfully", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ lastID: 7 }, null);
            });

            const result = await createMeal(1, mealData);

            expect(result.id).toBe(7);
            expect(result.meal_name).toBe("Chicken Salad");
            expect(result.calories).toBe(350);
        });

        test("rejects when database insert fails", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback(new Error("Insert failed"));
            });

            await expect(createMeal(1, mealData)).rejects.toThrow("Insert failed");
        });
    });

    describe("updateMeal", () => {

        const updateData = {
            meal_name: "Updated Meal",
            meal_type: "Dinner",
            calories: 500,
            protein: 25,
            carbs: 40,
            fat: 15
        };

        test("updates a meal successfully", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ changes: 1 }, null);
            });

            const result = await updateMeal(1, 3, updateData);

            expect(result.message).toBe("Meal updated successfully");
            expect(result.updated).toBe(true);
        });

        test("returns updated false when meal is not found", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ changes: 0 }, null);
            });

            const result = await updateMeal(1, 999, updateData);

            expect(result.updated).toBe(false);
        });

        test("rejects when database update fails", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback(new Error("Update error"));
            });

            await expect(updateMeal(1, 1, updateData)).rejects.toThrow("Update error");
        });
    });

    describe("deleteMeal", () => {

        test("deletes a meal successfully", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ changes: 1 }, null);
            });

            const result = await deleteMeal(1, 5);

            expect(result.deleted).toBe(true);
        });

        test("returns deleted false when meal is not found", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ changes: 0 }, null);
            });

            const result = await deleteMeal(1, 999);

            expect(result.deleted).toBe(false);
        });

        test("rejects when database delete fails", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback(new Error("Delete error"));
            });

            await expect(deleteMeal(1, 1)).rejects.toThrow("Delete error");
        });
    });
});