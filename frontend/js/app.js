function renderApp() {
    app.innerHTML = `
        <div class="layout">
            <aside class="sidebar">
                <div class="logo-box text-logo">
                    <div>
                        <div class="logo">NutriTrack🌿</div>
                        <small>Healthy lifestyle tracker</small>
                    </div>
                </div>
                <button class="nav-btn" onclick="goPage('dashboard')">🏠 Dashboard</button>
                <button class="nav-btn" onclick="goPage('meals')">🥗 Meals</button>
                <button class="nav-btn" onclick="goPage('goals')">🎯 Goals</button>
                <button class="nav-btn" onclick="goPage('profile')">👤 Profile</button>
                <button class="nav-btn" onclick="goPage('reports')">📊 Reports</button>
                <button class="nav-btn logout-btn" onclick="logout()">🚪 Logout</button>
            </aside>
            <main class="main">
                <div class="topbar">
                    <div>
                        <h2 id="pageTitle"></h2>
                        <p class="page-subtitle">We wish you a healthy life, ${currentUser.username}</p>
                    </div>
                    <div class="user-box">👤 ${currentUser.username}</div>
                </div>
                <div id="content"></div>
            </main>
        </div>
    `;
    renderPage();
}

function goPage(page) {
    currentPage = page;
    localStorage.setItem("currentPage", page);
    renderPage();
}

function renderPage() {
    if (currentPage === "dashboard") renderDashboard();
    if (currentPage === "meals")     renderMeals();
    if (currentPage === "goals")     renderGoals();
    if (currentPage === "profile")   renderProfile();
    if (currentPage === "reports")   renderReports();
}


if (token && currentUser) renderApp();
else renderLogin();
