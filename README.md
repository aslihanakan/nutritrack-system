# NutriTrack 🌿

A full-stack diet and health tracking web application built with Node.js, Express, SQLite, and Vanilla JavaScript.  
Developed as a System Analysis and Design course project.

---

# Table of Contents

- [Overview](#overview)
- [System Workflow](#system-workflow)
- [Key Functionalities](#key-functionalities)
- [Frontend Features](#frontend-features)
- [Security Features](#security-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Business Logic Layer](#business-logic-layer)
- [Testing Strategy](#testing-strategy)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Swagger API Documentation](#swagger-api-documentation)
- [API Reference](#api-reference)

---

# Overview

NutriTrack is a modern single-page health and nutrition tracking application where users can monitor their daily meals, calorie intake, water consumption, nutrition goals, and weight progress.

The system provides a responsive dashboard interface that dynamically calculates nutrition summaries and health statistics in real time.

The application was designed using a layered backend architecture including:

- Controllers
- Services
- Middleware
- Validation utilities
- REST API routes

All frontend-backend communication happens asynchronously using the Fetch API without page reloads.

---

# System Workflow

The system is designed as a health and nutrition tracking platform where users manage their lifestyle data through a modern SPA interface.

## User Workflow

### 1. Authentication
Users register and log into the system securely using JWT authentication.

### 2. Meal Tracking
Users can:
- Add meals
- Edit meals
- Delete meals
- View nutrition summaries

Each meal stores:
- Calories
- Protein
- Carbohydrates
- Fat values
- Meal type
- Meal date

### 3. Goal Management
Users define:
- Daily calorie goals
- Protein goals
- Carbohydrate goals
- Fat goals
- Water intake goals

The system compares current consumption with target goals dynamically.

### 4. Health Profile Analysis
Users can save personal health information such as:
- Age
- Height
- Weight
- Activity level
- Target weight

The system automatically calculates:
- BMI
- BMI status
- Ideal weight range
- Daily calorie needs

### 5. Water Tracking
Users can log daily water consumption and monitor hydration progress.

### 6. Weight Progress Monitoring
The application includes monthly weight tracking with:
- Weight history
- Progress visualization
- Target tracking
- Progress percentage calculations

### 7. Reporting System
The Reports page aggregates user data and generates:
- Nutrition summaries
- Daily reports
- Macro tracking
- Health summaries
- Weight tracking statistics

### 8. REST API & Swagger
All API endpoints are documented and testable using Swagger UI.

---

# Key Functionalities

## Smart Nutrition Tracking
The system automatically calculates total calorie and macronutrient intake based on user meal entries.

## Health Analysis
BMI, daily calorie need, and ideal weight calculations are generated automatically using health formulas.

## Dynamic Goal Progress
Animated progress bars display how close users are to reaching their nutrition goals.

## Weight Tracking System
Users can record monthly weight logs and monitor progress toward their target weight.

## JWT Authentication
Protected endpoints require valid JWT tokens for secure access.

## RESTful API Design
The backend follows REST architecture principles using Express routes and controllers.

## Interactive API Documentation
Swagger UI allows direct API testing from the browser.

---

# Frontend Features

- Responsive dashboard layout
- SPA navigation without page reloads
- Dynamic nutrition summaries
- Live goal progress tracking
- Weight history tables
- Monthly weight tracking
- Daily report system
- Interactive cards and progress bars
- Modern card-based UI
- Real-time dashboard updates

---

# Security Features

- JWT-based authentication
- Password hashing using bcryptjs
- Protected API routes
- Input validation
- Unauthorized access prevention
- Secure middleware-based authentication flow

---

# Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express 5 |
| Database | SQLite3 |
| Authentication | JWT, bcryptjs |
| Frontend | Vanilla JavaScript, HTML5, CSS3 |
| API Documentation | Swagger UI |
| Testing | Jest |
| Environment Config | dotenv |

---

# Project Architecture

The project follows a layered architecture structure:

## Backend Layers

### Controllers
Handle incoming HTTP requests and responses.

### Services
Contain business logic and database operations.

### Middleware
Authentication and request protection.

### Validation Utilities
Input validation and data verification.

### Routes
REST API endpoint definitions.

---

# Project Structure

```text
nutritrack-system/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── goalController.js
│   │   ├── mealController.js
│   │   ├── profileController.js
│   │   ├── reportController.js
│   │   └── waterController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── goalRoutes.js
│   │   ├── mealRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── reportRoutes.js
│   │   └── waterRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── goalService.js
│   │   ├── healthService.js
│   │   ├── mealService.js
│   │   ├── nutritionService.js
│   │   ├── profileService.js
│   │   └── waterService.js
│   │
│   ├── tests/
│   │   ├── authService.test.js
│   │   ├── goalService.test.js
│   │   ├── healthService.test.js
│   │   ├── mealService.test.js
│   │   ├── nutritionService.test.js
│   │  ├── profileService.test.js
│   │   ├── validation.test.js
│   │   └── waterService.test.js
│   │
│   ├── utils/
│   │   └── validation.js
│   │
│   ├── database.js
│   ├── nutritrack.db
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── swagger.js
│   └── .env
│
├── frontend/
│   │
│   ├── assets/
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── api.js
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── goals.js
│   │   ├── meals.js
│   │   ├── profile.js
│   │   ├── reports.js
│   │   └── utils.js
│   │
│   └── index.html
│
├── .gitignore
└── README.md
```

---

# Business Logic Layer

The project contains multiple business logic modules implemented inside the `services/` layer.

| Service | Responsibility |
|---|---|
| authService.js | Authentication and JWT generation |
| mealService.js | Meal CRUD operations |
| goalService.js | Goal management |
| profileService.js | User profile management |
| nutritionService.js | Nutrition summary calculations |
| healthService.js | BMI and calorie calculations |
| waterService.js | Water tracking logic |

---

# Testing Strategy

The application was tested using Jest unit tests with mocked database operations.

## Test Coverage Includes

- Authentication logic
- CRUD operations
- Validation functions
- Health calculations
- Nutrition summaries
- Error handling scenarios
- Goal management
- Water tracking

Mocked database calls were used to isolate business logic from persistence logic during testing.

---

# Getting Started

## Prerequisites

- Node.js v18+
- npm

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/nutritrack-system.git
```

Move into the project folder:

```bash
cd nutritrack-system
```

Install backend dependencies:

```bash
cd backend
npm install
```

No frontend dependency installation is required because the frontend uses Vanilla JavaScript.

---

# Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

---

# Running the Application

Inside the backend folder:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

---

# Application URLs

| URL | Description |
|---|---|
| http://localhost:5000 | Frontend Application |
| http://localhost:5000/api-docs | Swagger UI |
| http://localhost:5000/api/status | API Status Endpoint |

---

# Running Tests

Inside the backend folder:

```bash
npm test
```

Expected output:

```text
Test Suites: 8 passed, 8 total
Tests:       57 passed, 57 total
```

---

# Swagger API Documentation

The project includes interactive API documentation using Swagger UI.

Swagger allows testing all endpoints directly from the browser.

## Swagger Features

- Interactive API testing
- JWT authorization support
- Request/response examples
- Protected route testing
- REST endpoint documentation

## Swagger URL

```text
http://localhost:5000/api-docs
```

## JWT Authorization in Swagger

1. Register or login using:
   - `/api/auth/register`
   - `/api/auth/login`

2. Copy the JWT token returned from login.

3. Click the **Authorize** button in Swagger UI.

4. Paste the token in this format:

```text
Bearer your_token_here
```

5. Protected endpoints can now be tested directly.

---

# API Reference

## Authentication

### POST `/api/auth/register`
Register a new user.

### POST `/api/auth/login`
Login and receive JWT token.

---

## Meals

### GET `/api/meals`
Get all meals for the logged-in user.

### POST `/api/meals`
Add a new meal.

### PUT `/api/meals/:id`
Update a meal.

### DELETE `/api/meals/:id`
Delete a meal.

---

## Goals

### GET `/api/goals`
Get daily goals.

### POST `/api/goals`
Save or update goals.

---

## Profile

### GET `/api/profile`
Get health profile.

### POST `/api/profile`
Save or update health profile.

---

## Water

### POST `/api/water`
Add water intake entry.

### GET `/api/water/today`
Get daily water total.

---

## Reports

### GET `/api/reports/summary`
Get nutrition summary report.

---

# Author

Developed by Aslıhan Akan  
System Analysis and Design Project