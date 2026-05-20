# NutriTrack 🌿

A full-stack diet and health tracking web application built with Node.js, Express, SQLite, and Vanilla JavaScript. Developed as a System Analysis and Design course project.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [API Reference](#api-reference)

---

## Overview

NutriTrack is a single-page application (SPA) that helps users track their daily meals, monitor nutritional intake (calories, protein, carbs, fat), set daily goals, log water consumption, and view health metrics such as BMI and daily calorie needs. All frontend-backend communication happens asynchronously via the Fetch API without any page reloads.

---

## Features

- User registration and login with JWT authentication
- Full CRUD operations for meal entries (create, read, update, delete)
- Daily nutrition goals (calories, protein, carbs, fat, water)
- Health profile with automatic BMI calculation and daily calorie need estimation (Mifflin-St Jeor formula)
- Water intake logging and daily total tracking
- Nutrition summary reports
- Input validation on both frontend and backend
- Interactive API documentation via Swagger UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express 5 |
| Database | SQLite (via sqlite3) |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Frontend | Vanilla JavaScript (SPA), HTML5, CSS3 |
| API Docs | Swagger UI (swagger-ui-express, swagger-jsdoc) |
| Testing | Jest |

---

## Project Structure

```
nutritrack-system/
├── backend/
│   ├── controllers/        
│   │   ├── authController.js
│   │   ├── mealController.js
│   │   ├── goalController.js
│   │   ├── profileController.js
│   │   ├── waterController.js
│   │   └── reportController.js
│   ├── services/           
│   │   ├── authService.js
│   │   ├── mealService.js
│   │   ├── goalService.js
│   │   ├── profileService.js
│   │   ├── healthService.js
│   │   ├── nutritionService.js
│   │   └── waterService.js
│   ├── routes/             
│   ├── middleware/
│   │   └── authMiddleware.js   
│   ├── utils/
│   │   └── validation.js       
│   ├── tests/              
│   ├── database.js         
│   ├── swagger.js          
│   ├── server.js          
│   └── .env                
└── frontend/
    ├── index.html         
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js          
        ├── app.js          
        ├── auth.js         
        ├── dashboard.js   
        ├── meals.js       
        ├── goals.js        
        ├── profile.js     
        ├── reports.js     
        └── utils.js       
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/nutritrack-system.git
cd nutritrack-system
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

No frontend dependencies are needed — the frontend is pure Vanilla JavaScript.

---

## Environment Variables

Inside the `backend/` folder, create a `.env` file:

```
PORT=5000
JWT_SECRET=your_secret_key_here
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server will listen on | `5000` |
| `JWT_SECRET` | Secret key used to sign JWT tokens | `nutritrack_secret_key` |

> The SQLite database file (`nutritrack.db`) is created automatically on first run inside the `backend/` folder. No database setup is required.

---

## Running the Application

From the `backend/` directory:

```bash
# Production
npm start

# Development (auto-restart on file changes)
npm run dev
```

Once running, open your browser and navigate to:

| URL | Description |
|---|---|
| `http://localhost:5000` | Frontend application |
| `http://localhost:5000/api-docs` | Swagger UI (interactive API docs) |
| `http://localhost:5000/api/status` | API health check |

---

## Running Tests

From the `backend/` directory:

```bash
npm test
```

Expected output:

```
Test Suites: 8 passed, 8 total
Tests:       57 passed, 57 total
```

Tests cover business logic and validation functions

| Test File | What it covers |
|---|---|
| `authService.test.js` | Register, login, token generation |
| `mealService.test.js` | Get, create, update, delete meals |
| `goalService.test.js` | Get and save daily goals |
| `profileService.test.js` | Get and save health profile |
| `nutritionService.test.js` | Daily nutrition summary calculation |
| `healthService.test.js` | BMI, ideal weight, calorie need calculations |
| `waterService.test.js` | Log water intake, get daily total |
| `validation.test.js` | All input validation functions |

---

## API Documentation

Interactive documentation is available at `http://localhost:5000/api-docs` via Swagger UI. All protected endpoints require a Bearer token which you can obtain from the `/api/auth/login` endpoint and set using the **Authorize** button in the Swagger UI.

---

## API Reference

All protected routes require the following header:

```
Authorization: Bearer <token>
```

### Auth

#### `POST /api/auth/register`

Register a new user.

Request body:
```json
{
  "username": "aslihan",
  "email": "aslihan@example.com",
  "password": "123456"
}
```

Response `201`:
```json
{
  "message": "User registered successfully",
  "user": { "id": 1, "username": "aslihan", "email": "aslihan@example.com" }
}
```

---

#### `POST /api/auth/login`

Login and receive a JWT token.

Request body:
```json
{
  "email": "aslihan@example.com",
  "password": "123456"
}
```

Response `200`:
```json
{
  "token": "<jwt_token>",
  "user": { "id": 1, "username": "aslihan", "email": "aslihan@example.com" }
}
```

---

### Meals

#### `GET /api/meals` 🔒

Get all meals for the logged-in user, ordered by date descending.

#### `POST /api/meals` 🔒

Add a new meal entry.

Request body:
```json
{
  "meal_name": "Chicken Salad",
  "meal_type": "Lunch",
  "calories": 350,
  "protein": 30,
  "carbs": 20,
  "fat": 10,
  "meal_date": "2026-05-20"
}
```

Valid `meal_type` values: `Breakfast`, `Lunch`, `Dinner`, `Snack`

#### `PUT /api/meals/:id` 🔒

Update an existing meal by ID.

#### `DELETE /api/meals/:id` 🔒

Delete a meal by ID.

---

### Goals

#### `GET /api/goals` 🔒

Get the user's current daily nutrition and water goals.

#### `POST /api/goals` 🔒

Save or update daily goals.

Request body:
```json
{
  "calorie_goal": 2000,
  "protein_goal": 150,
  "carbs_goal": 200,
  "fat_goal": 65,
  "water_goal": 2500
}
```

---

### Profile

#### `GET /api/profile` 🔒

Get the user's health profile. The response includes calculated fields: `bmi`, `bmi_status`, `ideal_weight_range`, `daily_calorie_need`, and `suggestion`.

#### `POST /api/profile` 🔒

Save or update the health profile.

Request body:
```json
{
  "age": 22,
  "gender": "female",
  "height_cm": 165,
  "weight_kg": 60,
  "activity_level": "medium",
  "target_weight": 57
}
```

Valid `gender` values: `female`, `male`  
Valid `activity_level` values: `low`, `medium`, `high`

---

### Water

#### `POST /api/water` 🔒

Log a water intake entry.

Request body:
```json
{
  "amount_ml": 500
}
```

#### `GET /api/water/today` 🔒

Get total water intake logged for today.

---

### Reports

#### `GET /api/reports/summary` 🔒

Get an all-time nutrition summary aggregated across all meals (total and average calories, protein, carbs, fat).

---

## Developer

Aslıhan Akan

System Analysis and Design Project – 2026