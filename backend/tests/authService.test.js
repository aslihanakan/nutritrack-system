const bcrypt = require("bcryptjs");

jest.mock("../database", () => ({
    run: jest.fn(),
    get: jest.fn()
}));

const db = require("../database");
const { registerUser, loginUser } = require("../services/authService");

beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test_secret_key";
});

describe("authService", () => {

    describe("registerUser", () => {

        test("registers a new user successfully", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback.call({ lastID: 1 }, null);
            });

            const result = await registerUser({
                username: "testuser",
                email: "test@example.com",
                password: "123456"
            });

            expect(result).toEqual({
                id: 1,
                username: "testuser",
                email: "test@example.com"
            });
        });

        test("stores password as a hashed value", async () => {
            let savedParams = [];

            db.run.mockImplementation((sql, params, callback) => {
                savedParams = params;
                callback.call({ lastID: 2 }, null);
            });

            await registerUser({
                username: "user2",
                email: "user2@example.com",
                password: "mypassword"
            });

            const hashedPassword = savedParams[2];

            expect(hashedPassword).not.toBe("mypassword");
            expect(await bcrypt.compare("mypassword", hashedPassword)).toBe(true);
        });

        test("rejects when database insert fails", async () => {
            db.run.mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
            });

            await expect(
                registerUser({
                    username: "u",
                    email: "u@test.com",
                    password: "123456"
                })
            ).rejects.toThrow("DB error");
        });
    });

    describe("loginUser", () => {

        test("logs in successfully with valid credentials", async () => {
            const hashedPassword = await bcrypt.hash("123456", 10);

            db.get.mockImplementation((sql, params, callback) => {
                callback(null, {
                    id: 1,
                    username: "testuser",
                    email: "test@example.com",
                    password: hashedPassword
                });
            });

            const result = await loginUser({
                email: "test@example.com",
                password: "123456"
            });

            expect(result).toHaveProperty("token");
            expect(result.user).toEqual({
                id: 1,
                username: "testuser",
                email: "test@example.com"
            });
        });

        test("rejects when user does not exist", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(null, null);
            });

            await expect(
                loginUser({
                    email: "notfound@example.com",
                    password: "123456"
                })
            ).rejects.toThrow("Invalid email or password");
        });

        test("rejects when password is incorrect", async () => {
            const hashedPassword = await bcrypt.hash("correctpassword", 10);

            db.get.mockImplementation((sql, params, callback) => {
                callback(null, {
                    id: 1,
                    username: "user",
                    email: "user@example.com",
                    password: hashedPassword
                });
            });

            await expect(
                loginUser({
                    email: "user@example.com",
                    password: "wrongpassword"
                })
            ).rejects.toThrow("Invalid email or password");
        });

        test("rejects when database lookup fails", async () => {
            db.get.mockImplementation((sql, params, callback) => {
                callback(new Error("Connection lost"));
            });

            await expect(
                loginUser({
                    email: "e@test.com",
                    password: "123456"
                })
            ).rejects.toThrow("Connection lost");
        });
    });
});