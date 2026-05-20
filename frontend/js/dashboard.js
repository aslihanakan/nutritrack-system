function buildSmartWarnings({ todayCalories, calorieGoal, waterMl, waterGoal,
                               todayProtein, proteinGoal, todayFat, fatGoal,
                               todayCarbs, carbsGoal }) {
    const warnings = [];

    const calPct  = calorieGoal  ? (todayCalories / calorieGoal)  * 100 : 0;
    const watPct  = waterGoal    ? (waterMl        / waterGoal)    * 100 : 0;
    const proePct = proteinGoal  ? (todayProtein   / proteinGoal)  * 100 : 0;
    const fatPct  = fatGoal      ? (todayFat       / fatGoal)      * 100 : 0;
    const carbPct = carbsGoal    ? (todayCarbs     / carbsGoal)    * 100 : 0;

    
    if (calPct > 110) {
        warnings.push({ type: "danger", icon: "🔥", text: `You've exceeded your daily calorie goal! (${todayCalories} / ${calorieGoal} kcal — ${Math.round(calPct)}%)` });
    } else if (calPct > 90) {
        warnings.push({ type: "warning", icon: "⚠️", text: `You're close to your calorie limit. (${todayCalories} / ${calorieGoal} kcal — ${Math.round(calPct)}%)` });
    } else if (calPct < 30 && new Date().getHours() >= 15) {
        warnings.push({ type: "info", icon: "💡", text: `You've logged very few calories today. Don't forget to eat! (${todayCalories} / ${calorieGoal} kcal)` });
    }

    
    if (watPct < 40 && new Date().getHours() >= 14) {
        warnings.push({ type: "info", icon: "💧", text: `Low water intake! You've only had ${(waterMl/1000).toFixed(1)}L of your ${(waterGoal/1000).toFixed(1)}L goal.` });
    } else if (watPct >= 100) {
        warnings.push({ type: "success", icon: "✅", text: `Great job! You've reached your daily water goal (${(waterMl/1000).toFixed(1)}L).` });
    }

    
    if (proteinGoal && proePct > 150) {
        warnings.push({ type: "warning", icon: "🥩", text: `Protein intake is very high. (${todayProtein}g / ${proteinGoal}g — ${Math.round(proePct)}%)` });
    }

    
    if (fatGoal && fatPct > 120) {
        warnings.push({ type: "danger", icon: "🧈", text: `Fat intake exceeded your daily goal. (${todayFat}g / ${fatGoal}g — ${Math.round(fatPct)}%)` });
    }

   
    if (carbsGoal && carbPct > 120) {
        warnings.push({ type: "warning", icon: "🍞", text: `Carb intake is above your daily goal. (${todayCarbs}g / ${carbsGoal}g — ${Math.round(carbPct)}%)` });
    }

    if (warnings.length === 0) return "";

    const colorMap = {
        danger:  { bg: "#fff1f0", border: "#fca5a5", text: "#b91c1c" },
        warning: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
        info:    { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },
        success: { bg: "#f0fdf4", border: "#86efac", text: "#15803d" }
    };

    const items = warnings.map(w => {
        const c = colorMap[w.type];
        return `
            <div class="smart-warning" style="
                background:${c.bg};
                border:1.5px solid ${c.border};
                color:${c.text};
                border-radius:10px;
                padding:11px 16px;
                display:flex;
                align-items:center;
                gap:10px;
                font-size:14px;
                font-weight:500;
            ">
                <span style="font-size:18px">${w.icon}</span>
                <span>${w.text}</span>
            </div>`;
    }).join("");

    return `
        <div class="smart-warnings-block" style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
            <div style="font-size:13px;font-weight:600;color:#667085;letter-spacing:.5px;margin-bottom:2px">
                🔔 SMART WARNINGS
            </div>
            ${items}
        </div>`;
}


async function renderDashboard() {
    document.getElementById("pageTitle").textContent = "Dashboard";

    const summaryRes = await fetch(`${API_URL}/reports/summary`, { headers: apiHeaders() });
    const summary = await summaryRes.json();

    const mealsRes = await fetch(`${API_URL}/meals`, { headers: apiHeaders() });
    const meals = await mealsRes.json();

    const profile = await getProfileSafe();
    const goals   = await getGoalsSafe();
    const water   = await getWaterSafe();

    const today = todayText();

    const todayMeals    = meals.filter(meal => meal.meal_date === today);
    const todayCalories = todayMeals.reduce((sum, m) => sum + Number(m.calories || 0), 0);
    const todayProtein  = todayMeals.reduce((sum, m) => sum + Number(m.protein  || 0), 0);
    const todayCarbs    = todayMeals.reduce((sum, m) => sum + Number(m.carbs    || 0), 0);
    const todayFat      = todayMeals.reduce((sum, m) => sum + Number(m.fat      || 0), 0);

    const last7Days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().split("T")[0]);
    }
    const weeklyTotal   = meals.filter(m => last7Days.includes(m.meal_date)).reduce((sum, m) => sum + Number(m.calories || 0), 0);
    const weeklyAverage = Math.round(weeklyTotal / 7);

    const calorieGoal   = goals.calorie_goal || profile?.daily_calorie_need || 2000;
    const caloriePercent = Math.min(Math.round((todayCalories / calorieGoal) * 100), 100);

    const waterGoal    = goals.water_goal   || 2500;
    const proteinGoal  = goals.protein_goal || 0;
    const carbsGoal    = goals.carbs_goal   || 0;
    const fatGoal      = goals.fat_goal     || 0;
    const waterMl      = water.total_water_ml || water.total_water || 0;
    const waterPercent = Math.min(Math.round((waterMl / waterGoal) * 100), 100);

    const exercise  = getExerciseLog();
    const weighPlan = getWeighPlan();
    const nextWeighDate = calculateNextWeighDate(weighPlan?.date, weighPlan?.time);

    const totalMacroG = todayProtein + todayCarbs + todayFat || 1;
    const proteinPct  = Math.round((todayProtein / totalMacroG) * 100);
    const carbsPct    = Math.round((todayCarbs   / totalMacroG) * 100);
    const macroConic  = `conic-gradient(
        #4f9d63 0% ${proteinPct}%,
        #38bdf8 ${proteinPct}% ${proteinPct + carbsPct}%,
        #f97316 ${proteinPct + carbsPct}% 100%
    )`;

  
    const warningsHtml = buildSmartWarnings({
        todayCalories, calorieGoal,
        waterMl, waterGoal,
        todayProtein, proteinGoal,
        todayFat, fatGoal,
        todayCarbs, carbsGoal
    });

    document.getElementById("content").innerHTML = `
        <div class="hero-card">
            <div>
                <h2>Healthy body + healthy mind = happy life</h2>
                <p>Track nutrition, hydration, health profile, exercise and weigh-in habits from one dashboard.</p>
            </div>
        </div>

        ${warningsHtml}

        <!-- ── TOP 3 STAT CARDS ── -->
        <div class="top-stats-row">
            <div class="card stat-card calories-wide-card">
                <h3>Daily Calories</h3>
                <div class="calories-inner">
                    <div class="calories-left">
                        <div class="big-number">${todayCalories}</div>
                        <p>${todayCalories} / ${calorieGoal} kcal</p>
                        <div class="progress" style="margin-top:10px">
                            <div class="progress-bar" style="width:${caloriePercent}%"></div>
                        </div>
                        <p class="muted" style="margin-top:6px;font-size:13px">${caloriePercent}% of daily goal</p>
                    </div>
                    <div class="macro-ring-wrap">
                        <div class="macro-ring" style="background:${macroConic}">
                            <div class="macro-ring-center">
                                <span class="macro-ring-label">${totalMacroG > 1 ? totalMacroG : 0}g</span>
                                <small>total</small>
                            </div>
                        </div>
                    </div>
                    <div class="macro-legend">
                        <div class="macro-legend-item">
                            <span class="legend-dot" style="background:#4f9d63"></span>
                            <div><strong>${todayProtein}g</strong><small>Protein</small></div>
                        </div>
                        <div class="macro-legend-item">
                            <span class="legend-dot" style="background:#38bdf8"></span>
                            <div><strong>${todayCarbs}g</strong><small>Carbs</small></div>
                        </div>
                        <div class="macro-legend-item">
                            <span class="legend-dot" style="background:#f97316"></span>
                            <div><strong>${todayFat}g</strong><small>Fat</small></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card stat-card">
                <h3>Weekly Average</h3>
                <div class="stat-content">
                    <div>
                        <div class="big-number">${weeklyAverage}</div>
                        <p>avg kcal / day</p>
                    </div>
                    <div class="mini-chart">
                        <div class="bar" style="height:35px"></div>
                        <div class="bar" style="height:52px"></div>
                        <div class="bar" style="height:42px"></div>
                        <div class="bar" style="height:68px"></div>
                    </div>
                </div>
            </div>

            <div class="card stat-card">
                <h3>BMI</h3>
                <div class="stat-content">
                    <div>
                        <div class="big-number">${profile?.bmi || "-"}</div>
                        <p>${profile?.bmi_status || "Complete your profile"}</p>
                    </div>
                    <div class="donut bmi-donut" style="--value:${profile?.bmi ? "70%" : "10%"}"></div>
                </div>
            </div>
        </div>

        <!-- ── BOTTOM ROW ── -->
        <div class="dashboard-bottom">
            <div class="card image-card hydration-card">
                <div class="hydration-top">
                    <img src="${IMAGES.water}" alt="Water" class="hydration-mascot">
                    <div class="hydration-right">
                        <h3>Water Intake &amp; Hydration Goal</h3>
                        <div class="big-number" id="waterLiterText">${(waterMl / 1000).toFixed(1)}L</div>
                        <p id="waterDetailText">${waterMl} / ${waterGoal} ml completed today</p>
                        <div class="progress">
                            <div id="waterProgressBar" class="progress-bar" style="width:${waterPercent}%"></div>
                        </div>
                        <p class="muted" id="waterPercentText">${waterPercent}% of your daily water goal is completed.</p>
                        <div class="water-input-row">
                            <input type="number" id="customWaterAmount" placeholder="Water amount (ml)">
                            <button onclick="addCustomWater()">Add Water</button>
                        </div>
                    </div>
                </div>
                <div class="hydration-bottom">
                    <img src="${IMAGES.waterText}" alt="Drink More Water" class="drink-more-img">
                </div>
            </div>

            <div class="card image-card exercise-card">
                <img src="${IMAGES.exercise}" alt="Exercise">
                <h3>Today's Exercise</h3>
                <div class="mini-data-row">
                    <span>Exercise Time</span>
                    <strong id="exerciseHourText">${exercise.hours} hour</strong>
                </div>
                <div class="mini-data-row">
                    <span>Steps</span>
                    <strong id="exerciseStepText">${exercise.steps}</strong>
                </div>
                <div class="exercise-input-row">
                    <input type="number" id="exerciseHours" placeholder="Hours" value="${exercise.hours || ""}">
                    <input type="number" id="exerciseSteps" placeholder="Steps" value="${exercise.steps || ""}">
                </div>
                <button class="save-btn small-wide-btn" onclick="saveExercise()">Save Exercise</button>
            </div>

            <div class="card image-card weigh-card">
                <img src="${IMAGES.scale}" alt="Scale">
                <h3>Weigh-in Schedule</h3>
                <p><strong>Current:</strong> ${profile?.weight_kg || "-"} kg</p>
                <p><strong>Target:</strong> ${profile?.target_weight || "-"} kg</p>
                <label class="small-label">Last weigh-in date</label>
                <input type="date" id="weighDate" value="${weighPlan?.date || ""}">
                <label class="small-label">Preferred time</label>
                <input type="time" id="weighTime" value="${weighPlan?.time || "09:00"}">
                <button class="save-btn small-wide-btn" onclick="saveWeighPlan()">Save Weigh-in</button>
                <p class="suggestion-mini" id="nextWeighText">
                    Next weigh-in: ${nextWeighDate}
                </p>
            </div>
        </div>
    `;
}


async function addWater(amountMl) {
    await fetch(`${API_URL}/water`, {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({ amount_ml: amountMl })
    });
    await updateWaterCardOnly();
}

async function updateWaterCardOnly() {
    const goals = await getGoalsSafe();
    const water = await getWaterSafe();
    const waterGoal    = goals.water_goal || 2500;
    const waterMl      = water.total_water_ml || water.total_water || 0;
    const waterPercent = Math.min(Math.round((waterMl / waterGoal) * 100), 100);
    const el = id => document.getElementById(id);
    if (el("waterLiterText"))   el("waterLiterText").textContent   = `${(waterMl / 1000).toFixed(1)}L`;
    if (el("waterDetailText"))  el("waterDetailText").textContent  = `${waterMl} / ${waterGoal} ml completed today`;
    if (el("waterPercentText")) el("waterPercentText").textContent = `${waterPercent}% of your daily water goal is completed.`;
    if (el("waterProgressBar")) el("waterProgressBar").style.width = `${waterPercent}%`;
}

async function addCustomWater() {
    const amountInput = document.getElementById("customWaterAmount");
    const amount = Number(amountInput.value);
    if (!amount || amount <= 0) { alert("Enter valid water amount"); return; }
    await addWater(amount);
    amountInput.value = "";
}

function saveExercise() {
    const hours = Number(document.getElementById("exerciseHours").value) || 0;
    const steps = Number(document.getElementById("exerciseSteps").value) || 0;
    saveExerciseLog(hours, steps);
    const el = id => document.getElementById(id);
    if (el("exerciseHourText")) el("exerciseHourText").textContent = `${hours} hour`;
    if (el("exerciseStepText")) el("exerciseStepText").textContent = steps;
}

function saveWeighPlan() {
    const date = document.getElementById("weighDate").value;
    const time = document.getElementById("weighTime").value;
    if (!date) { alert("Please select last weigh-in date"); return; }
    localStorage.setItem("weighPlan", JSON.stringify({ date, time }));
    const nextText = document.getElementById("nextWeighText");
    if (nextText) nextText.textContent = `Next weigh-in: ${calculateNextWeighDate(date, time)}`;
}
