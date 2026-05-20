jest.mock("../database", () => ({
    get: jest.fn(),
    run: jest.fn()
}));

const db = require("../database");
const { getGoalByUser, saveGoal } = require("../services/goalService");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("goalService", () => {

    describe("getGoalByUser", () => {

        test("returns user's goal data", async () => {
            const mockGoal = {
                user_id: 1,
                calorie_goal: 2000,
                protein_goal: 150,
                carbs_goal: 200,
                fat_goal: 60,
                water_goal: 2500
            };

            db.get.mockImplementation((sql, params, callback) => {
                callback(null, mockGoal);
            });

            const result = await getGoalByUser(1);

            expect(result).toEqual(mockGoal);
        });

        test("returns undefined when goal does not exist", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, undefined);
            });

            const result = await getGoalByUser(99);

            expect(result).toBeUndefined();
        });

        test("rejects when database error occurs", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
            });

            await expect(
                getGoalByUser(1)
            ).rejects.toThrow("DB error");
        });
    });

    describe("saveGoal", () => {

        const goalData = {
            calorie_goal: 2200,
            protein_goal: 160,
            carbs_goal: 250,
            fat_goal: 70,
            water_goal: 3000
        };

        test("saves goal data successfully", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ lastID: 1 }, null);
            });

            const result = await saveGoal(1, goalData);

            expect(result.calorie_goal).toBe(2200);
            expect(result.protein_goal).toBe(160);
            expect(result.water_goal).toBe(3000);
        });

        test("rejects when database error occurs", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback(new Error("Insert error"));
            });

            await expect(
                saveGoal(1, goalData)
            ).rejects.toThrow("Insert error");
        });
    });
});