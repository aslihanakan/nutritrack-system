jest.mock("../database", () => ({
    run: jest.fn(),
    get: jest.fn()
}));

const db = require("../database");

const {
    addWaterLog,
    getTodayWater
} = require("../services/waterService");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("waterService", () => {

    describe("addWaterLog", () => {

        test("adds water log successfully", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ lastID: 4 }, null);
            });

            const result = await addWaterLog(1, 500, "2026-05-19");

            expect(result).toEqual({
                id: 4,
                amount_ml: 500,
                log_date: "2026-05-19"
            });
        });

        test("rejects when database insert fails", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback(new Error("Insert failed"));
            });

            await expect(
                addWaterLog(1, 250, "2026-05-19")
            ).rejects.toThrow("Insert failed");
        });
    });

    describe("getTodayWater", () => {

        test("returns today's total water amount", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, { total_water: 1500 });
            });

            const result = await getTodayWater(1, "2026-05-19");

            expect(result).toEqual({
                total_water: 1500
            });
        });

        test("returns 0 when no water log exists", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, { total_water: null });
            });

            const result = await getTodayWater(1, "2026-05-19");

            expect(result.total_water).toBe(0);
        });

        test("rejects when database query fails", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(new Error("Query error"));
            });

            await expect(
                getTodayWater(1, "2026-05-19")
            ).rejects.toThrow("Query error");
        });
    });
});