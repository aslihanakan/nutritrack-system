const {
    validateRegister,
    validateLogin
} = require("../utils/validation");

const {
    registerUser,
    loginUser
} = require("../services/authService");

async function register(req, res) {
    try {
        const validationError = validateRegister(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const user = await registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function login(req, res) {
    try {
        const validationError = validateLogin(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const result = await loginUser(req.body);

        res.status(200).json({
            message: "Login successful",
            ...result
        });

    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
};