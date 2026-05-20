function openEditMealModal(meal) {
    
    const existing = document.getElementById("editMealModal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "editMealModal";
    overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.45);
        display:flex;align-items:center;justify-content:center;z-index:9999;
        backdrop-filter:blur(3px);
    `;
    overlay.innerHTML = `
        <div style="
            background:#fff;border-radius:16px;padding:32px 28px;
            width:100%;max-width:480px;box-shadow:0 20px 60px rgba(0,0,0,.2);
            position:relative;
        ">
            <button onclick="document.getElementById('editMealModal').remove()" style="
                position:absolute;top:14px;right:16px;border:none;background:none;
                font-size:22px;cursor:pointer;color:#667085;line-height:1;
            ">×</button>
            <h3 style="margin:0 0 6px;font-size:18px;color:#101828">✏️ Edit Meal</h3>
            <p style="margin:0 0 20px;font-size:13px;color:#667085">Update the details below and save.</p>

            <label style="font-size:13px;font-weight:600;color:#344054">Foods</label>
            <input id="editMealName" value="${meal.meal_name || ""}" style="
                width:100%;box-sizing:border-box;padding:9px 12px;border:1.5px solid #d0d5dd;
                border-radius:8px;font-size:14px;margin:4px 0 14px;outline:none;
            ">

            <label style="font-size:13px;font-weight:600;color:#344054">Type</label>
            <select id="editMealType" style="
                width:100%;box-sizing:border-box;padding:9px 12px;border:1.5px solid #d0d5dd;
                border-radius:8px;font-size:14px;margin:4px 0 14px;outline:none;background:#fff;
            ">
                ${["Breakfast","Lunch","Dinner","Snack"].map(t =>
                    `<option ${meal.meal_type === t ? "selected" : ""}>${t}</option>`
                ).join("")}
            </select>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
                ${[
                    ["Calories","editMealCalories",meal.calories],
                    ["Protein (g)","editMealProtein",meal.protein],
                    ["Carbs (g)","editMealCarbs",meal.carbs],
                    ["Fat (g)","editMealFat",meal.fat]
                ].map(([label,id,val]) => `
                    <div>
                        <label style="font-size:13px;font-weight:600;color:#344054">${label}</label>
                        <input id="${id}" type="number" value="${val || 0}" style="
                            width:100%;box-sizing:border-box;padding:9px 12px;
                            border:1.5px solid #d0d5dd;border-radius:8px;font-size:14px;
                            margin-top:4px;outline:none;
                        ">
                    </div>
                `).join("")}
            </div>

            <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:4px">
                <button onclick="document.getElementById('editMealModal').remove()" style="
                    padding:9px 20px;border:1.5px solid #d0d5dd;border-radius:8px;
                    background:#fff;color:#344054;font-size:14px;font-weight:600;cursor:pointer;
                ">Cancel</button>
                <button onclick="saveEditedMeal(${meal.id})" style="
                    padding:9px 20px;border:none;border-radius:8px;
                    background:#4f9d63;color:#fff;font-size:14px;font-weight:600;cursor:pointer;
                ">Save Changes</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
   
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });
}

async function saveEditedMeal(id) {
    const updated = {
        meal_name: document.getElementById("editMealName").value,
        meal_type: document.getElementById("editMealType").value,
        calories:  Number(document.getElementById("editMealCalories").value),
        protein:   Number(document.getElementById("editMealProtein").value),
        carbs:     Number(document.getElementById("editMealCarbs").value),
        fat:       Number(document.getElementById("editMealFat").value)
    };
    const res = await fetch(`${API_URL}/meals/${id}`, {
        method: "PUT",
        headers: apiHeaders(),
        body: JSON.stringify(updated)
    });
    if (!res.ok) {
        alert("Failed to update meal. Check backend.");
        return;
    }
    document.getElementById("editMealModal").remove();
    renderMeals(mealDate);
}


let mealDate = todayText();

async function renderMeals(date) {
    if (date) mealDate = date;
    document.getElementById("pageTitle").textContent = "Meals";

    const res = await fetch(`${API_URL}/meals`, { headers: apiHeaders() });
    const allMeals = await res.json();

    const meals    = allMeals.filter(meal => meal.meal_date === mealDate);
    const prevDate = offsetDate(mealDate, -1);
    const nextDate = offsetDate(mealDate, +1);
    const isToday  = mealDate === todayText();

    const uniqueDates = [...new Set(allMeals.map(m => m.meal_date))]
        .filter(Boolean).sort().reverse();

    document.getElementById("content").innerHTML = `
        <div class="card page-intro">
            <div>
                <h3>Meal Tracking</h3>
                <p>Add your meals and review them day by day.</p>
            </div>
            <img src="${IMAGES.meals}" class="intro-img" alt="Meals">
        </div>

        <div class="card">
            <h3>Add Meal for ${formatDateText(mealDate)}</h3>
            <div class="form-row">
                <input id="mealName" placeholder="Foods eaten (egg, cheese, bread...)">
                <select id="mealType">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                </select>
                <input id="calories" type="number" placeholder="Calories">
                <input id="protein"  type="number" placeholder="Protein">
            </div>
            <div class="form-row">
                <input id="carbs" type="number" placeholder="Carbs">
                <input id="fat"   type="number" placeholder="Fat">
                <button class="save-btn" onclick="addMeal()">Add Meal</button>
            </div>
        </div>

<div class="report-date-nav">

    <button class="nav-arrow-btn" onclick="renderMeals('${prevDate}')">
        &#8592; Prev
    </button>

    <div class="date-nav-center">

        <span class="report-date-label">
            ${formatDateText(mealDate)}
            ${isToday ? "<span class='today-badge'>Today</span>" : ""}
        </span>

        <div class="date-picker-wrap">
            <input
                type="date"
                class="date-jump-input"
                value="${mealDate}"
                onchange="renderMeals(this.value)"
            >
        </div>

    </div>

    <button
        class="nav-arrow-btn"
        onclick="renderMeals('${nextDate}')"
        ${isToday ? "disabled" : ""}>
        Next &#8594;
    </button>

</div>

        <div class="card">
            <h3>Meal List — ${formatDateText(mealDate)}</h3>
            ${meals.length === 0
                ? `<div class="empty-state"><p>No meals found for this date.</p></div>`
                : `<table class="table">
                    <thead>
                        <tr>
                            <th>Foods</th><th>Type</th><th>Calories</th>
                            <th>Protein</th><th>Carbs</th><th>Fat</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${meals.map(meal => `
                            <tr>
                                <td>${meal.meal_name}</td>
                                <td>${meal.meal_type}</td>
                                <td>${meal.calories}</td>
                                <td>${meal.protein}</td>
                                <td>${meal.carbs}</td>
                                <td>${meal.fat}</td>
                                <td style="display:flex;gap:6px">
                                    <button class="small-btn edit-btn"
                                        onclick='openEditMealModal(${JSON.stringify(meal)})'>
                                        ✏️ Edit
                                    </button>
                                    <button class="small-btn delete-btn"
                                        onclick="deleteMeal(${meal.id})">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>`
            }
        </div>
    `;
}

async function addMeal() {
    const meal = {
        meal_name: document.getElementById("mealName").value,
        meal_type: document.getElementById("mealType").value,
        calories:  Number(document.getElementById("calories").value),
        protein:   Number(document.getElementById("protein").value),
        carbs:     Number(document.getElementById("carbs").value),
        fat:       Number(document.getElementById("fat").value)
    };
    await fetch(`${API_URL}/meals`, {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify(meal)
    });
    renderMeals(todayText());
}

async function deleteMeal(id) {
    await fetch(`${API_URL}/meals/${id}`, { method: "DELETE", headers: apiHeaders() });
    renderMeals();
}
