jest.mock("../database", () => ({
    get: jest.fn(),
    run: jest.fn()
}));

const db = require("../database");

const {
    getProfileByUser,
    saveProfile
} = require("../services/profileService");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("profileService", () => {

    describe("getProfileByUser", () => {

        test("returns null when profile does not exist", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, null);
            });

            const result = await getProfileByUser(99);

            expect(result).toBeNull();
        });

        test("returns profile data with calculated health values", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, {
                    user_id: 1,
                    age: 25,
                    gender: "male",
                    height_cm: 175,
                    weight_kg: 70,
                    activity_level: "medium",
                    target_weight: 68
                });
            });

            const result = await getProfileByUser(1);

            expect(result).toHaveProperty("bmi");
            expect(result).toHaveProperty("bmi_status");
            expect(result).toHaveProperty("ideal_weight_range");
            expect(result).toHaveProperty("daily_calorie_need");
            expect(result).toHaveProperty("suggestion");
        });

        test("rejects when database lookup fails", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
            });

            await expect(getProfileByUser(1)).rejects.toThrow("DB error");
        });
    });

    describe("saveProfile", () => {

        const profileData = {
            age: 25,
            gender: "male",
            height_cm: 175,
            weight_kg: 70,
            activity_level: "medium",
            target_weight: 68
        };

        test("saves profile and returns calculated result", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ lastID: 1 }, null);
            });

            db.get.mockImplementation((sql, params, callback) => {
                callback(null, {
                    user_id: 1,
                    ...profileData
                });
            });

            const result = await saveProfile(1, profileData);

            expect(result.age).toBe(25);
            expect(result).toHaveProperty("bmi");
            expect(result).toHaveProperty("daily_calorie_need");
        });

        test("rejects when database save fails", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback(new Error("Save error"));
            });

            await expect(saveProfile(1, profileData)).rejects.toThrow("Save error");
        });
    });
});