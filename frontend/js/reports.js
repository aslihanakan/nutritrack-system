let reportDate = todayText();

async function renderReports(date) {
    if (date) reportDate = date;
    document.getElementById("pageTitle").textContent = "Reports";

    const summaryRes = await fetch(`${API_URL}/reports/summary`, { headers: apiHeaders() });
    const data = await summaryRes.json();

    const mealsRes = await fetch(`${API_URL}/meals`, { headers: apiHeaders() });
    const allMeals = await mealsRes.json();

    const profile   = await getProfileSafe();
    const exercise  = getExerciseLog();
    const weighPlan = getWeighPlan();
    const water     = await getWaterSafe();
    const goals     = await getGoalsSafe();

    const waterGoal    = goals.water_goal    || 2500;
    const calorieGoal  = goals.calorie_goal  || profile?.daily_calorie_need || 2000;
    const proteinGoal  = goals.protein_goal  || 0;
    const carbsGoal    = goals.carbs_goal    || 0;
    const fatGoal      = goals.fat_goal      || 0;

    const waterMl      = water.total_water_ml || water.total_water || 0;
    const waterPercent = Math.min(Math.round((waterMl / waterGoal) * 100), 100);

    const dayMeals    = allMeals.filter(m => m.meal_date === reportDate);
    const dayCalories = dayMeals.reduce((s, m) => s + Number(m.calories || 0), 0);
    const dayProtein  = dayMeals.reduce((s, m) => s + Number(m.protein  || 0), 0);
    const dayCarbs    = dayMeals.reduce((s, m) => s + Number(m.carbs    || 0), 0);
    const dayFat      = dayMeals.reduce((s, m) => s + Number(m.fat      || 0), 0);

    const remainingCalories = Math.max(calorieGoal - dayCalories, 0);
    const calPercent     = Math.min(Math.round((dayCalories / calorieGoal) * 100), 100);
    const proteinPercent = proteinGoal ? Math.min(Math.round((dayProtein / proteinGoal) * 100), 100) : 0;
    const carbsPercent   = carbsGoal   ? Math.min(Math.round((dayCarbs   / carbsGoal)   * 100), 100) : 0;
    const fatPercent     = fatGoal     ? Math.min(Math.round((dayFat     / fatGoal)     * 100), 100) : 0;

    const prevDate = offsetDate(reportDate, -1);
    const nextDate = offsetDate(reportDate, +1);
    const isToday  = reportDate === todayText();

    const uniqueDates = [...new Set(allMeals.map(m => m.meal_date))].sort().reverse();

    function miniBar(pct, color) {
        return `
            <div style="flex:1;background:#f2f4f7;border-radius:99px;height:8px;min-width:80px">
                <div style="width:${pct}%;height:100%;border-radius:99px;background:${color};transition:width .4s"></div>
            </div>`;
    }

    function reportRow(icon, label, value, extra, pct, color) {
        const bar = (pct !== null) ? miniBar(pct, color) : `<div style="flex:1"></div>`;
        return `
            <tr style="border-bottom:1px solid #f2f4f7">
                <td style="padding:13px 14px;white-space:nowrap;color:#667085;font-size:14px;width:32px">${icon}</td>
                <td style="padding:13px 8px;font-size:14px;font-weight:600;color:#344054;white-space:nowrap">${label}</td>
                <td style="padding:13px 8px;font-size:15px;font-weight:700;color:#101828;white-space:nowrap">${value}</td>
                <td style="padding:13px 8px;font-size:13px;color:#667085;white-space:nowrap">${extra}</td>
                <td style="padding:13px 14px 13px 8px;width:140px">${bar}</td>
            </tr>`;
    }

    // ── Alt özet: 4 bölüm tek satırda
    function summarySection(title, rows) {
        return `
            <div style="flex:1;min-width:0;padding:0 18px;border-right:1px solid #f2f4f7">
                <div style="font-size:13px;font-weight:700;color:#344054;margin-bottom:12px;letter-spacing:.3px">${title}</div>
                ${rows.map(([label, value]) => `
                    <div style="display:flex;justify-content:space-between;align-items:center;
                                padding:6px 0;border-bottom:1px solid #f9fafb;gap:8px">
                        <span style="font-size:13px;color:#667085">${label}</span>
                        <strong style="font-size:13px;color:#101828;white-space:nowrap">${value}</strong>
                    </div>
                `).join("")}
            </div>`;
    }

    document.getElementById("content").innerHTML = `
        <div class="card page-intro">
            <div>
                <h3>Health Reports</h3>
                <p>Review your nutrition, exercise and health summary day by day.</p>
            </div>
            <img src="${IMAGES.reports}" class="intro-img" alt="Reports">
        </div>

       <div class="report-date-nav">
    <button class="nav-arrow-btn" onclick="renderReports('${prevDate}')">&#8592; Prev</button>

    <div class="date-nav-center">
        <span class="report-date-label">
            ${formatDateText(reportDate)}
            ${isToday ? " <span class='today-badge'>Today</span>" : ""}
        </span>

        <div class="date-picker-wrap">
            <input
                type="date"
                class="date-jump-input"
                value="${reportDate}"
                onchange="renderReports(this.value)"
            >
        </div>
    </div>

    <button class="nav-arrow-btn" onclick="renderReports('${nextDate}')" ${isToday ? "disabled" : ""}>
        Next &#8594;
    </button>
</div>

        <!-- ★ DAILY REPORT — büyük kart -->
        <div class="card" style="margin-bottom:18px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <div>
                    <h3 style="margin:0;font-size:17px">📋 Daily Report</h3>
                    <p class="muted" style="margin:4px 0 0;font-size:13px">${formatDateText(reportDate)} — ${dayMeals.length} meal(s) logged</p>
                </div>
                <div style="
                    background:${calPercent >= 100 ? "#fef2f2" : calPercent >= 80 ? "#fffbeb" : "#f0fdf4"};
                    color:${calPercent >= 100 ? "#b91c1c" : calPercent >= 80 ? "#92400e" : "#15803d"};
                    border-radius:99px;padding:5px 14px;font-size:13px;font-weight:700;
                    border:1.5px solid ${calPercent >= 100 ? "#fca5a5" : calPercent >= 80 ? "#fcd34d" : "#86efac"};
                ">
                    ${calPercent >= 100 ? "⚠️ Over goal" : calPercent >= 80 ? "🟡 Near limit" : "✅ On track"}
                </div>
            </div>

            <div style="overflow-x:auto">
                <table style="width:100%;border-collapse:collapse">
                    <thead>
                        <tr style="border-bottom:2px solid #e9ecef">
                            <th style="padding:8px 14px;text-align:left;font-size:12px;color:#667085;font-weight:600;letter-spacing:.5px"></th>
                            <th style="padding:8px 8px;text-align:left;font-size:12px;color:#667085;font-weight:600;letter-spacing:.5px">METRIC</th>
                            <th style="padding:8px 8px;text-align:left;font-size:12px;color:#667085;font-weight:600;letter-spacing:.5px">TODAY</th>
                            <th style="padding:8px 8px;text-align:left;font-size:12px;color:#667085;font-weight:600;letter-spacing:.5px">GOAL / INFO</th>
                            <th style="padding:8px 14px;text-align:left;font-size:12px;color:#667085;font-weight:600;letter-spacing:.5px">PROGRESS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportRow("🔥", "Calories",     `${dayCalories} kcal`,           `Goal: ${calorieGoal} kcal`,             calPercent,     "#4f9d63")}
                        ${reportRow("🍽️", "Remaining",    `${remainingCalories} kcal`,      `${100 - calPercent}% left`,             null,           null)}
                        ${reportRow("🥩", "Protein",      `${dayProtein} g`,                `Goal: ${proteinGoal} g`,                proteinPercent, "#6366f1")}
                        ${reportRow("🍞", "Carbs",        `${dayCarbs} g`,                  `Goal: ${carbsGoal} g`,                  carbsPercent,   "#38bdf8")}
                        ${reportRow("🧈", "Fat",          `${dayFat} g`,                    `Goal: ${fatGoal} g`,                    fatPercent,     "#f97316")}
                        ${reportRow("💧", "Water Intake", `${(waterMl/1000).toFixed(1)} L`, `Goal: ${(waterGoal/1000).toFixed(1)} L`,waterPercent,   "#0ea5e9")}
                        ${reportRow("🏋️", "Exercise",     `${exercise.hours} hour`,         `Today's workout time`,                  null,           null)}
                        ${reportRow("👟", "Steps",        `${exercise.steps}`,              `Today's steps`,                         null,           null)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- ★ ALT ÖZET — 4 bölüm tek kart tek satır -->
        <div class="card" style="padding:20px 0">
            <div style="display:flex;align-items:stretch">

                ${summarySection("📊 All-time Totals", [
                    ["Total Calories", `${data.total_calories || 0} kcal`],
                    ["Total Meals",    `${data.total_meals    || 0}`],
                ])}

                ${summarySection("🥗 Macro Distribution", [
                    ["Protein", `${data.total_protein || 0} g`],
                    ["Carbs",   `${data.total_carbs   || 0} g`],
                    ["Fat",     `${data.total_fat     || 0} g`],
                ])}

                ${summarySection("🩺 Health Summary", [
                    ["BMI",        `${profile?.bmi        || "-"}`],
                    ["Status",     `${profile?.bmi_status || "-"}`],
                    ["Daily Need", `${profile?.daily_calorie_need || "-"} kcal`],
                ])}

                <div style="flex:1;min-width:0;padding:0 18px">
                    <div style="font-size:13px;font-weight:700;color:#344054;margin-bottom:12px;letter-spacing:.3px">⚖️ Weigh-in Plan</div>
                    ${[
                        ["Last",  weighPlan?.date ? formatDateText(weighPlan.date) : "-"],
                        ["Next",  calculateNextWeighDate(weighPlan?.date, weighPlan?.time)],
                    ].map(([label, value]) => `
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;
                                    padding:6px 0;border-bottom:1px solid #f9fafb;gap:8px">
                            <span style="font-size:13px;color:#667085;white-space:nowrap">${label}</span>
                            <strong style="font-size:13px;color:#101828;text-align:right">${value}</strong>
                        </div>
                    `).join("")}
                </div>

            </div>
        </div>
    `;
}
