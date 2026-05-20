function renderLogin() {
    app.innerHTML = `
        <div class="auth-page">
            <div class="auth-card auth-wide">
                <div>
                    <h1>NutriTrack🌿</h1>
                    <p>Track your meals, goals, water intake and health profile.</p>
                    <input id="loginEmail" type="email" placeholder="Email">
                    <input id="loginPassword" type="password" placeholder="Password">
                    <button class="primary-btn" onclick="login()">Login</button>
                    <button class="text-btn" onclick="renderRegister()">Create new account</button>
                    <div id="authMessage" class="message"></div>
                </div>
                <img src="${IMAGES.login}" class="auth-image" alt="Healthy eating">
            </div>
        </div>
    `;
}

function renderRegister() {
    app.innerHTML = `
        <div class="auth-page">
            <div class="auth-card auth-wide">
                <div>
                    <h1>Create Account</h1>
                    <p>Start your healthy lifestyle tracking journey.</p>
                    <input id="regUsername" type="text" placeholder="Username">
                    <input id="regEmail" type="email" placeholder="Email">
                    <input id="regPassword" type="password" placeholder="Password">
                    <button class="primary-btn" onclick="register()">Register</button>
                    <button class="text-btn" onclick="renderLogin()">Already have an account?</button>
                    <div id="authMessage" class="message"></div>
                </div>
                <img src="${IMAGES.dashboard}" class="auth-image" alt="Welcome">
            </div>
        </div>
    `;
}

async function register() {
    const data = {
        username: document.getElementById("regUsername").value.trim(),
        email: document.getElementById("regEmail").value.trim(),
        password: document.getElementById("regPassword").value
    };

    if (!data.username || !data.email || !data.password) {
        document.getElementById("authMessage").textContent = "All fields are required";
        return;
    }
    if (data.password.length < 6) {
        document.getElementById("authMessage").textContent = "Password must be at least 6 characters";
        return;
    }
    if (!data.email.includes("@")) {
        document.getElementById("authMessage").textContent = "Please enter a valid email address";
        return;
    }

    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) renderLogin();
    else document.getElementById("authMessage").textContent = result.message;
}

async function login() {
    const data = {
        email: document.getElementById("loginEmail").value.trim(),
        password: document.getElementById("loginPassword").value
    };

    if (!data.email || !data.password) {
        document.getElementById("authMessage").textContent = "Email and password are required";
        return;
    }

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) { saveAuth(result); renderApp(); }
    else document.getElementById("authMessage").textContent = result.message;
}
