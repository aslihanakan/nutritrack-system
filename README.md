# NutriTrack 🌿

A full-stack diet and health tracking web application built with Node.js, Express, SQLite, and Vanilla JavaScript. Developed as a System Analysis and Design course project.

---

# Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Business Logic](#business-logic)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Swagger API Documentation](#swagger-api-documentation)
- [API Reference](#api-reference)
- [Future Improvements](#future-improvements)
- [Developer](#developer)

---

# Overview

NutriTrack is a single-page application (SPA) designed to help users maintain a healthier lifestyle by tracking meals, nutrition values, hydration, and body progress.

The system allows users to:

- Track daily meals
- Monitor calories and macronutrients
- Set nutrition goals
- Track water intake
- Calculate BMI and daily calorie needs
- Monitor weight changes over time
- View health summaries and reports

All frontend-backend communication is handled asynchronously using the Fetch API without page reloads.

---

# Features

## Authentication
- User registration
- Secure login system
- JWT-based authentication
- Protected API routes

## Meal Management
- Add meals
- Edit meals
- Delete meals
- Daily meal history
- Nutrition tracking

## Goal Tracking
- Daily calorie goals
- Protein goals
- Carbohydrate goals
- Fat goals
- Water intake goals
- Live progress bars

## Health Profile
- BMI calculation
- BMI status evaluation
- Ideal weight range estimation
- Daily calorie need calculation
- Personalized suggestions

## Weight Tracking
- Monthly weight logs
- Weight history table
- Goal progress tracking
- Target weight comparison

## Reports
- Daily nutrition reports
- Nutrition summaries
- Macro tracking
- Water consumption overview

## API & Testing
- Swagger UI integration
- RESTful API structure
- Unit tests with Jest
- Input validation
- Error handling

---

# Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express 5 |
| Database | SQLite (sqlite3) |
| Authentication | JWT, bcryptjs |
| Frontend | Vanilla JavaScript, HTML5, CSS3 |
| API Documentation | Swagger UI |
| Testing | Jest |
| Architecture | SPA + REST API |

---

# System Architecture

The project follows a layered architecture structure:

```text
Frontend (SPA)
       ↓
Controllers
       ↓
Services (Business Logic)
       ↓
Database Layer (SQLite)
```

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| Frontend | User interface and interactions |
| Controllers | HTTP request/response handling |
| Services | Business logic and calculations |
| Database | Data persistence |
| Middleware | Authentication and security |
| Utils | Validation and helper functions |

---

# Project Structure

```text
nutritrack-system/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── mealController.js
│   │   ├── goalController.js
│   │   ├── profileController.js
│   │   ├── waterController.js
│   │   └── reportController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── mealService.js
│   │   ├── goalService.js
│   │   ├── profileService.js
│   │   ├── healthService.js
│   │   ├── nutritionService.js
│   │   └── waterService.js
│   │
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── tests/
│   ├── database.js
│   ├── swagger.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── index.html
    ├── css/
    ├── js/
    │   ├── api.js
    │   ├── app.js
    │   ├── auth.js
    │   ├── dashboard.js
    │   ├── meals.js
    │   ├── goals.js
    │   ├── profile.js
    │   ├── reports.js
    │   └── utils.js
    └── assets/
```

---

# Business Logic

The project contains multiple business logic components implemented in the service layer.

## Examples of Business Logic

### Health Calculations
- BMI calculation
- BMI category classification
- Daily calorie need estimation
- Ideal weight range estimation

### Nutrition Processing
- Total nutrition summary calculation
- Daily calorie aggregation
- Macronutrient tracking

### Goal Progress Logic
- Dynamic progress percentage calculations
- Remaining calorie calculations
- Weight goal tracking

### Validation Rules
- Input validation
- Positive number checks
- Authentication validation
- Meal type validation

---

# Getting Started

## Prerequisites

Install the following software before running the project:

- Node.js v18 or higher
- npm

Download Node.js:
https://nodejs.org/

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/aslihanakan/nutritrack-system.git
```

## 2. Open the project folder

```bash
cd nutritrack-system
```

## 3. Install backend dependencies

```bash
cd backend
npm install
```

No frontend dependencies are required because the frontend is built with Vanilla JavaScript.

---

# Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
```

| Variable | Description |
|---|---|
| PORT | Server port |
| JWT_SECRET | JWT signing key |

The SQLite database file is created automatically during first execution.

---

# Running the Application

Inside the `backend/` folder:

## Production

```bash
npm start
```

## Development Mode

```bash
npm run dev
```

When the server starts successfully:

```text
Server is running on port 5000
Database connected
```

---

# Application URLs

| URL | Description |
|---|---|
| http://localhost:5000 | Frontend Application |
| http://localhost:5000/api-docs | Swagger API Documentation |
| http://localhost:5000/api/status | API Health Check |

---

# Running Tests

Inside the `backend/` folder:

```bash
npm test
```

Expected output:

```text
Test Suites: 8 passed, 8 total
Tests:       57 passed, 57 total
```

---

# Test Coverage

| Test File | Description |
|---|---|
| authService.test.js | Authentication logic |
| mealService.test.js | Meal CRUD operations |
| goalService.test.js | Goal management |
| profileService.test.js | Profile calculations |
| nutritionService.test.js | Nutrition summaries |
| healthService.test.js | BMI and calorie calculations |
| waterService.test.js | Water tracking |
| validation.test.js | Validation functions |

---

# Swagger API Documentation

Swagger UI is integrated into the project for interactive API testing and documentation.

## Swagger Packages Used

- swagger-ui-express
- swagger-jsdoc

## Access Swagger

Open:

```text
http://localhost:5000/api-docs
```

---

# Using Swagger Authentication

Most endpoints are protected using JWT Bearer Authentication.

## Step 1 — Register

Use:

```http
POST /api/auth/register
```

Create a new account.

---

## Step 2 — Login

Use:

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "aslihan@example.com",
  "password": "123456"
}
```

Example response:

```json
{
  "token": "jwt_token_here"
}
```

---

## Step 3 — Copy Token

Copy the JWT token returned from the login endpoint.

---

## Step 4 — Authorize

Click the **Authorize** button in Swagger UI.

Enter the token like this:

```text
Bearer your_token_here
```

After authorization, protected endpoints can be tested directly from Swagger UI.

---

# API Reference

## Authentication

### POST /api/auth/register

Register a new user.

### POST /api/auth/login

Login and receive JWT token.

---

## Meals

### GET /api/meals
Get all meals.

### POST /api/meals
Create a new meal.

### PUT /api/meals/:id
Update a meal.

### DELETE /api/meals/:id
Delete a meal.

---

## Goals

### GET /api/goals
Get nutrition goals.

### POST /api/goals
Save nutrition goals.

---

## Profile

### GET /api/profile
Get health profile.

### POST /api/profile
Save health profile.

---

## Water

### POST /api/water
Add water log.

### GET /api/water/today
Get today's water total.

---

## Reports

### GET /api/reports/summary
Get nutrition summary report.

---

# Future Improvements

Possible future enhancements:

- Chart.js integration
- Weekly and monthly analytics
- Mobile responsive optimization
- Cloud deployment
- User profile pictures
- Email verification
- Export reports as PDF
- AI-based nutrition suggestions

---

# Developer

**Aslıhan Akan**

System Analysis and Design Project — 2026
