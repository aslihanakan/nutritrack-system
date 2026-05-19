const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../database");

function registerUser(userData) {
    return new Promise(async (resolve, reject) => {
        const { username, email, password } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [username, email, hashedPassword], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: this.lastID,
                    username,
                    email
                });
            }
        });
    });
}

function loginUser(userData) {
    return new Promise((resolve, reject) => {
        const { email, password } = userData;

        const sql = `
            SELECT * FROM users WHERE email = ?
        `;

        db.get(sql, [email], async (err, user) => {
            if (err) {
                reject(err);
                return;
            }

            if (!user) {
                reject(new Error("Invalid email or password"));
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                reject(new Error("Invalid email or password"));
                return;
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            resolve({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });
    });
}

module.exports = {
    registerUser,
    loginUser
};