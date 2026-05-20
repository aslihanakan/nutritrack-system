<div align="center">

# 🌿 NutriTrack

### Smart Diet & Health Tracking Web Application

<p align="center">
Track your meals, calories, nutrition goals, water intake, and weight progress in one modern dashboard.
</p>

---

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge&logo=sqlite)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-brightgreen?style=for-the-badge&logo=swagger)
![Jest](https://img.shields.io/badge/Jest-Testing-red?style=for-the-badge&logo=jest)

</div>

---

# 📌 Overview

NutriTrack is a full-stack Single Page Application (SPA) developed for the **System Analysis and Design** course.

The project helps users maintain a healthier lifestyle by tracking:

- Daily meals
- Calories
- Macronutrients
- Water intake
- Weight progress
- Nutrition goals
- Health statistics

The application uses a layered backend architecture with REST APIs and dynamic frontend rendering using Vanilla JavaScript.

---

# ✨ Main Features

## 🔐 Authentication System
- User registration
- User login
- JWT token authentication
- Protected API routes

---

## 🥗 Meal Tracking
Users can:
- Add meals
- Update meals
- Delete meals
- View nutrition summaries

Each meal includes:
- Meal type
- Calories
- Protein
- Carbs
- Fat
- Meal date

---

## 🎯 Goal Management
Users can define:
- Daily calorie goals
- Protein goals
- Carbohydrate goals
- Fat goals
- Water goals

The system dynamically tracks progress toward these goals.

---

## 📊 Nutrition Analytics
Automatic calculations for:
- Daily calorie intake
- Protein totals
- Carb totals
- Fat totals
- Remaining calories
- Nutrition summaries

---

## 💧 Water Tracking
Users can:
- Log daily water intake
- Track hydration progress
- Compare intake with target goals

---

## ⚖️ Weight Tracking
Monthly weight tracking system including:
- Weight history
- Progress calculations
- Goal tracking
- Progress percentage visualization

---

## 🧠 Health Calculations
The system automatically calculates:
- BMI
- BMI status
- Ideal weight range
- Daily calorie needs

---

## 📑 Swagger API Documentation
Interactive API documentation using Swagger UI.

Users can:
- Test endpoints
- Send requests
- Authenticate with JWT
- View responses directly

---

# 🏗️ System Architecture

The project follows a layered architecture:

```text
Frontend (SPA)
       ↓
REST API Routes
       ↓
Controllers
       ↓
Services (Business Logic)
       ↓
SQLite Database
```

---

# 🧩 Technologies Used

| Category | Technologies |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Database | SQLite3 |
| Authentication | JWT, bcryptjs |
| API Documentation | Swagger UI |
| Testing | Jest |
| Environment Variables | dotenv |

---

# 📁 Project Structure

```text
nnutritrack-system/
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

# 🧠 Business Logic Modules

| Service | Responsibility |
|---|---|
| authService.js | Authentication & JWT |
| mealService.js | Meal CRUD operations |
| goalService.js | Goal management |
| profileService.js | User profile management |
| nutritionService.js | Nutrition calculations |
| healthService.js | BMI & calorie calculations |
| waterService.js | Water tracking |

---

# 🧪 Testing

The application includes unit testing using Jest.

## ✔ Test Coverage

- Authentication logic
- Validation functions
- Meal operations
- Goal operations
- Water tracking
- BMI calculations
- Nutrition calculations
- Error handling scenarios

---

# 📸 Application Modules

| Module | Description |
|---|---|
| Dashboard | Main health overview |
| Meals | Meal CRUD management |
| Goals | Nutrition goals & progress |
| Profile | Health profile management |
| Reports | Nutrition summaries & analytics |

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/nutritrack-system.git
```

---

## 2️⃣ Install Dependencies

```bash
cd nutritrack-system/backend
npm install
```

---

## 3️⃣ Create Environment File

Create `.env` inside `backend/`

```env
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 4️⃣ Start Application

```bash
npm start
```

Development mode:

```bash
npm run dev
```

---

# 🌐 Application URLs

| URL | Description |
|---|---|
| http://localhost:5000 | Frontend Application |
| http://localhost:5000/api-docs | Swagger UI |
| http://localhost:5000/api/status | API Status |

---

# 🔑 Swagger Authorization

1. Login using:

```text
POST /api/auth/login
```

2. Copy JWT token

3. Click **Authorize** in Swagger UI

4. Paste token:

```text
Bearer your_token_here
```

---

# 🧪 Run Tests

```bash
npm test
```

Expected result:

```text
Test Suites: 8 passed, 8 total
Tests:       57 passed, 57 total
```

---

# 📡 API Endpoints

## Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

---

## Meals
- `GET /api/meals`
- `POST /api/meals`
- `PUT /api/meals/:id`
- `DELETE /api/meals/:id`

---

## Goals
- `GET /api/goals`
- `POST /api/goals`

---

## Profile
- `GET /api/profile`
- `POST /api/profile`

---

## Water
- `POST /api/water`
- `GET /api/water/today`

---

## Reports
- `GET /api/reports/summary`

---

# 🎯 SPA Structure

NutriTrack is implemented as a Single Page Application (SPA).

The application dynamically renders pages using JavaScript without refreshing the browser.

Main SPA modules:
- Dashboard
- Meals
- Goals
- Profile
- Reports

---

# 👩‍💻 Author

### Aslıhan Akan

System Analysis and Design Project

---