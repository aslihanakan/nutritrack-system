async function renderGoals() {
    document.getElementById("pageTitle").textContent = "Goals";

    const res  = await fetch(`${API_URL}/goals`, { headers: apiHeaders() });
    const goal = await res.json();

    const mealsRes  = await fetch(`${API_URL}/meals`, { headers: apiHeaders() });
    const allMeals  = await mealsRes.json();
    const water     = await getWaterSafe();

    const profile       = await getProfileSafe();
   const weighPlan     = getWeighPlan();
const weightHistory = getWeightHistory();

const latestWeightEntry = weightHistory.length > 0
    ? weightHistory[weightHistory.length - 1]
    : null;

const lastWeighDate = latestWeightEntry?.date || weighPlan?.date || null;

const nextWeighDate = lastWeighDate
    ? calculateNextWeighDate(lastWeighDate, weighPlan?.time)
    : "-";
    const targetWeight  = profile?.target_weight || null;

    
    const today = todayText();
    const todayMeals    = allMeals.filter(m => m.meal_date === today);
    const todayCalories = todayMeals.reduce((s, m) => s + Number(m.calories || 0), 0);
    const todayProtein  = todayMeals.reduce((s, m) => s + Number(m.protein  || 0), 0);
    const todayCarbs    = todayMeals.reduce((s, m) => s + Number(m.carbs    || 0), 0);
    const todayFat      = todayMeals.reduce((s, m) => s + Number(m.fat      || 0), 0);
    const waterMl       = water.total_water_ml || water.total_water || 0;

    const calorieGoal  = goal.calorie_goal || 2000;
    const proteinGoal  = goal.protein_goal || 100;
    const carbsGoal    = goal.carbs_goal   || 250;
    const fatGoal      = goal.fat_goal     || 70;
    const waterGoal    = goal.water_goal   || 2500;

    
    function goalBar(label, current, target, unit, color) {
        const pct   = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;
        const over  = target > 0 && current > target;
        const barColor = over ? "#ef4444" : color;
        return `
            <div class="goal-bar-row">
                <div class="goal-bar-header">
                    <span class="goal-bar-label">${label}</span>
                    <span class="goal-bar-value" style="color:${over ? "#ef4444" : "#344054"}">
                        ${current} / ${target} ${unit}
                        ${over ? `<span style="color:#ef4444;font-size:12px"> (+${current - target} over)</span>` : ""}
                    </span>
                </div>
                <div class="progress" style="height:10px;border-radius:6px">
                    <div class="progress-bar" style="width:${pct}%;background:${barColor};border-radius:6px;transition:width .4s"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:12px;color:#667085;margin-top:3px">
                    <span>${pct}% completed</span>
                    <span>${Math.max(target - current, 0)} ${unit} remaining</span>
                </div>
            </div>`;
    }

    
    const historyRows = weightHistory.length === 0
        ? `<tr><td colspan="4" style="text-align:center;color:#667085;padding:16px">No weight entries yet.</td></tr>`
        : weightHistory.slice().reverse().map((entry, idx) => {
            const prev = weightHistory[weightHistory.length - 2 - idx];
            let diff = "";
            if (prev) {
                const d = (entry.weight - prev.weight).toFixed(1);
                const sign = d > 0 ? "+" : "";
                const color = d > 0 ? "#ef4444" : "#4f9d63";
                diff = `<span style="color:${color};font-weight:600">${sign}${d} kg</span>`;
            }
            let toTarget = "";
            if (targetWeight) {
                const rem = (entry.weight - targetWeight).toFixed(1);
                const color2 = rem > 0 ? "#f97316" : "#4f9d63";
                toTarget = `<span style="color:${color2}">${rem > 0 ? rem + " kg to go" : "✅ Goal reached!"}</span>`;
            }
            return `<tr>
                <td>${formatDateText(entry.date)}</td>
                <td><strong>${entry.weight} kg</strong></td>
                <td>${diff || "-"}</td>
                <td>${toTarget || "-"}</td>
            </tr>`;
        }).join("");

    
    let progressSection = "";
    if (targetWeight && weightHistory.length > 0) {
        const firstWeight  = weightHistory[0].weight;
        const latestWeight = weightHistory[weightHistory.length - 1].weight;
        const totalNeeded  = Math.abs(firstWeight - targetWeight);
        const achieved     = Math.abs(firstWeight - latestWeight);
        const pct          = totalNeeded > 0 ? Math.min(Math.round((achieved / totalNeeded) * 100), 100) : 100;
        progressSection = `
            <div style="margin-top:16px">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span style="font-weight:600;font-size:14px">Progress to target (${targetWeight} kg)</span>
                    <strong style="color:#2f7d46">${pct}%</strong>
                </div>
                <div class="progress"><div class="progress-bar" style="width:${pct}%"></div></div>
                <div style="display:flex;justify-content:space-between;font-size:12px;color:#667085;margin-top:4px">
                    <span>Start: ${firstWeight} kg</span>
                    <span>Now: ${latestWeight} kg</span>
                    <span>Target: ${targetWeight} kg</span>
                </div>
            </div>`;
    }

    document.getElementById("content").innerHTML = `
        <div class="goals-layout">
            <div class="card profile-form-card">
                <h3>Set Your Daily Goals</h3>
                <p class="muted">Define daily nutrition and water goals.</p>
                <label>Daily Calorie Goal</label>
                <input id="calorieGoal" type="number" value="${calorieGoal}">
                <label>Protein Goal (g)</label>
                <input id="proteinGoal" type="number" value="${proteinGoal}">
                <label>Carbs Goal (g)</label>
                <input id="carbsGoal" type="number" value="${carbsGoal}">
                <label>Fat Goal (g)</label>
                <input id="fatGoal" type="number" value="${fatGoal}">
                <label>Water Goal (ml)</label>
                <input id="waterGoal" type="number" value="${waterGoal}">
                <button class="primary-btn" onclick="saveGoals()">Save Goals</button>
                <p id="goalsSaveMessage"
                  style="margin-top:8px;font-size:13px;color:#2f7d46;display:none">
                </p>
            </div>

            <div class="card progress-tracking-card">
                <img src="${IMAGES.tarti2}" alt="Progress tracking">
                <h3>Monthly Progress Tracking</h3>
                <div class="mini-data-row">
                    <span>This month you are</span>
                    <strong>${profile?.weight_kg || "-"} kg</strong>
                </div>
                <div class="mini-data-row">
                    <span>Target weight</span>
                    <strong>${profile?.target_weight || "-"} kg</strong>
                </div>
                <div class="mini-data-row">
                    <span>Last weigh-in</span>
                   <strong>
    ${latestWeightEntry
        ? `${formatDateText(latestWeightEntry.date)} (${latestWeightEntry.weight} kg)`
        : "-"}
</strong>
                </div>
                <div class="suggestion-box">
                    Next recommended weigh-in: ${nextWeighDate}
                </div>
            </div>
        </div>

        <!-- ★ GOAL PROGRESS BARS -->
        <div class="card" style="margin-top:22px">
            <h3>📊 Today's Goal Progress</h3>
            <p class="muted" style="margin-bottom:18px">Live tracking of your daily targets for ${formatDateText(today)}.</p>
            <div style="display:flex;flex-direction:column;gap:18px">
                ${goalBar("🔥 Calories", todayCalories, calorieGoal, "kcal", "#4f9d63")}
                ${goalBar("🥩 Protein",  todayProtein,  proteinGoal,  "g",    "#6366f1")}
                ${goalBar("🍞 Carbs",    todayCarbs,    carbsGoal,    "g",    "#38bdf8")}
                ${goalBar("🧈 Fat",      todayFat,      fatGoal,      "g",    "#f97316")}
                ${goalBar("💧 Water",    waterMl,       waterGoal,    "ml",   "#0ea5e9")}
            </div>
        </div>

        <!-- Weight Tracking -->
        <div class="card" style="margin-top:22px">
            <h3>⚖️ Weight Tracking — Monthly Log</h3>
            <p class="muted">Record your weight each month to track progress toward your target.</p>
            <div class="weight-entry-row">
                <div>
                    <label class="small-label">Weigh-in Date</label>
                    <input type="date" id="wlogDate" value="${todayText()}">
                </div>
                <div>
                    <label class="small-label">Weight (kg)</label>
                    <input type="number" id="wlogWeight" step="0.1" placeholder="e.g. 72.5">
                </div>
                <div style="align-self:flex-end">
                    <button class="save-btn" onclick="addWeightEntry()">Add Entry</button>
                </div>
            </div>
            ${progressSection}
            <table class="table" style="margin-top:18px">
                <thead>
                    <tr>
                        <th>Date</th><th>Weight</th><th>Change</th><th>To Target</th>
                    </tr>
                </thead>
                <tbody id="weightHistoryBody">${historyRows}</tbody>
            </table>
        </div>
    `;
}

function addWeightEntry() {
    const date   = document.getElementById("wlogDate").value;
    const weight = parseFloat(document.getElementById("wlogWeight").value);
    if (!date || isNaN(weight) || weight <= 0) {
        alert("Please enter a valid date and weight.");
        return;
    }
    saveWeightEntry(date, weight);
    renderGoals();
}

async function saveGoals() {
    const goal = {
        calorie_goal: Number(document.getElementById("calorieGoal").value),
        protein_goal: Number(document.getElementById("proteinGoal").value),
        carbs_goal:   Number(document.getElementById("carbsGoal").value),
        fat_goal:     Number(document.getElementById("fatGoal").value),
        water_goal:   Number(document.getElementById("waterGoal").value)
    };

    try {
        const res = await fetch(`${API_URL}/goals`, {
            method: "POST",
            headers: apiHeaders(),
            body: JSON.stringify(goal)
        });

        if (!res.ok) {
            throw new Error("Save failed");
        }

        const msg = document.getElementById("goalsSaveMessage");

        msg.style.display = "block";
        msg.textContent = "Goals saved successfully!";

        setTimeout(() => {
            msg.style.display = "none";
        }, 2500);

    } catch (err) {
        alert("Goals could not be saved.");
        console.error(err);
    }
}
