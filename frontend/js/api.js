const API_URL = "http://localhost:5000/api";

let currentPage = localStorage.getItem("currentPage") || "dashboard";
let token = localStorage.getItem("token");
let currentUser = JSON.parse(localStorage.getItem("user") || "null");

const app = document.getElementById("app");

const IMAGES = {
    login: "assets/eat_right.jpg",
    dashboard: "assets/estetik_giris.jpg",
    meals: "assets/food-team.jpg",
    profile: "assets/happy_healty.jpg",
    reports: "assets/renksemasi.jpg",
    exercise: "assets/kasyapanbrokoli.jpg",
    scale: "assets/tarti.jpg",
    water: "assets/water.jpg",
    tarti2: "assets/tarti2.png",
    waterText: "assets/waterText.jpg"
};

function apiHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

function saveAuth(data) {
    token = data.token;
    currentUser = data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(currentUser));
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentPage");
    token = null;
    currentUser = null;
    currentPage = "dashboard";
    renderLogin();
}

async function getProfileSafe() {
    try {
        const res = await fetch(`${API_URL}/profile`, { headers: apiHeaders() });
        if (!res.ok) return null;
        return await res.json();
    } catch { return null; }
}

async function getGoalsSafe() {
    try {
        const res = await fetch(`${API_URL}/goals`, { headers: apiHeaders() });
        if (!res.ok) return {};
        return await res.json();
    } catch { return {}; }
}

async function getWaterSafe() {
    try {
        const res = await fetch(`${API_URL}/water/today`, { headers: apiHeaders() });
        if (!res.ok) return { total_water_ml: 0 };
        return await res.json();
    } catch { return { total_water_ml: 0 }; }
}
