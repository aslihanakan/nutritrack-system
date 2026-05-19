const swaggerUi = require("swagger-ui-express");

const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "NutriTrack API",
        version: "1.0.0",
        description: "API documentation for NutriTrack diet tracking system"
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    paths: {

        // ── AUTH ─────────────────────────────────────────────────────────────
        "/api/auth/register": {
            post: {
                summary: "Register a new user",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: {
                                username: "aslihan",
                                email: "aslihan@test.com",
                                password: "123456"
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "User registered successfully" },
                    400: { description: "Validation error or user already exists" }
                }
            }
        },
        "/api/auth/login": {
            post: {
                summary: "Login user and receive JWT token",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: {
                                email: "aslihan@test.com",
                                password: "123456"
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Login successful, returns token" },
                    401: { description: "Invalid credentials" }
                }
            }
        },

        // ── MEALS ─────────────────────────────────────────────────────────────
        "/api/meals": {
            get: {
                summary: "Get all meals of logged-in user",
                tags: ["Meals"],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Meal list returned" },
                    401: { description: "Unauthorized" }
                }
            },
            post: {
                summary: "Add a new meal",
                tags: ["Meals"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: {
                                meal_name: "Eggs and Toast",
                                meal_type: "Breakfast",
                                calories: 450,
                                protein: 25,
                                carbs: 40,
                                fat: 15,
                                meal_date: "2026-05-19"
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "Meal added successfully" },
                    400: { description: "Missing required fields" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/api/meals/{id}": {
            put: {
                summary: "Update an existing meal",
                tags: ["Meals"],
                security: [{ bearerAuth: [] }],
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    description: "Meal ID"
                }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: {
                                meal_name: "Updated Breakfast",
                                meal_type: "Breakfast",
                                calories: 500,
                                protein: 30,
                                carbs: 45,
                                fat: 18
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Meal updated successfully" },
                    404: { description: "Meal not found" },
                    401: { description: "Unauthorized" }
                }
            },
            delete: {
                summary: "Delete a meal",
                tags: ["Meals"],
                security: [{ bearerAuth: [] }],
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    description: "Meal ID"
                }],
                responses: {
                    200: { description: "Meal deleted successfully" },
                    404: { description: "Meal not found" },
                    401: { description: "Unauthorized" }
                }
            }
        },

        // ── GOALS ─────────────────────────────────────────────────────────────
        "/api/goals": {
            get: {
                summary: "Get daily nutrition and water goals",
                tags: ["Goals"],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Goals returned" },
                    401: { description: "Unauthorized" }
                }
            },
            post: {
                summary: "Save or update daily goals",
                tags: ["Goals"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: {
                                calorie_goal: 2000,
                                protein_goal: 100,
                                carbs_goal: 250,
                                fat_goal: 70,
                                water_goal: 2500
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Goals saved successfully" },
                    401: { description: "Unauthorized" }
                }
            }
        },

        // ── PROFILE ───────────────────────────────────────────────────────────
        "/api/profile": {
            get: {
                summary: "Get user health profile",
                tags: ["Profile"],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Returns BMI, ideal weight range, daily calorie need and suggestion" },
                    401: { description: "Unauthorized" }
                }
            },
            post: {
                summary: "Save or update health profile",
                tags: ["Profile"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: {
                                age: 22,
                                gender: "female",
                                height_cm: 165,
                                weight_kg: 58,
                                activity_level: "medium",
                                target_weight: 54
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Profile saved, returns calculated BMI and calorie need" },
                    400: { description: "Missing or invalid fields" },
                    401: { description: "Unauthorized" }
                }
            }
        },

        // ── WATER ─────────────────────────────────────────────────────────────
        "/api/water": {
            post: {
                summary: "Log water intake",
                tags: ["Water"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: { amount_ml: 500 }
                        }
                    }
                },
                responses: {
                    201: { description: "Water intake logged" },
                    400: { description: "Invalid amount" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/api/water/today": {
            get: {
                summary: "Get today's total water intake",
                tags: ["Water"],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Returns total_water_ml for today" },
                    401: { description: "Unauthorized" }
                }
            }
        },

        // ── REPORTS ───────────────────────────────────────────────────────────
        "/api/reports/summary": {
            get: {
                summary: "Get all-time nutrition summary",
                tags: ["Reports"],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Returns total_calories, total_meals, total_protein, total_carbs, total_fat" },
                    401: { description: "Unauthorized" }
                }
            }
        }
    }
};

module.exports = { swaggerUi, swaggerSpec };