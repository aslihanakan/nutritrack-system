function validateRegister(data) {
    const { username, email, password } = data;

    if (!username || !email || !password) {
        return "All fields are required";
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

    return null;
}

module.exports = {
    validateRegister,
    validateLogin
};