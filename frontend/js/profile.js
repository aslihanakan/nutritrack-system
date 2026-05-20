// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════════════════════════════════════
async function renderProfile() {
    document.getElementById("pageTitle").textContent = "Health Profile";
    const profile = await getProfileSafe();

    document.getElementById("content").innerHTML = `
        <div class="profile-layout">
            <div class="card profile-form-card">
                <h3>Personal Health Information</h3>
                <p class="muted">Save your information to calculate BMI, ideal weight and daily calorie need.</p>
                <label>Age</label>
                <input id="profileAge" type="number" value="${profile?.age || ""}" placeholder="Example: 21">
                <label>Gender</label>
                <select id="profileGender">
                    <option value="female" ${profile?.gender === "female" ? "selected" : ""}>Female</option>
                    <option value="male"   ${profile?.gender === "male"   ? "selected" : ""}>Male</option>
                </select>
                <label>Height (cm)</label>
                <input id="profileHeight" type="number" value="${profile?.height_cm || ""}" placeholder="Example: 165">
                <label>Weight (kg)</label>
                <input id="profileWeight" type="number" value="${profile?.weight_kg || ""}" placeholder="Example: 60">
                <label>Activity Level</label>
                <select id="profileActivity">
                    <option value="low"    ${profile?.activity_level === "low"    ? "selected" : ""}>Low</option>
                    <option value="medium" ${profile?.activity_level === "medium" ? "selected" : ""}>Medium</option>
                    <option value="high"   ${profile?.activity_level === "high"   ? "selected" : ""}>High</option>
                </select>
                <label>Target Weight (kg)</label>
                <input id="profileTargetWeight" type="number" value="${profile?.target_weight || ""}" placeholder="Example: 55">
                <button class="primary-btn" onclick="saveProfile()">Save Profile</button>
            </div>
            <div class="card profile-result-card">
                <img src="${IMAGES.profile}" class="profile-img" alt="Health profile">
                <h3>Health Analysis</h3>
                ${profile && profile.bmi
                    ? `<div class="health-metric"><span>BMI</span><strong>${profile.bmi}</strong></div>
                       <div class="health-metric"><span>BMI Status</span><strong>${profile.bmi_status}</strong></div>
                       <div class="health-metric"><span>Ideal Weight Range</span><strong>${profile.ideal_weight_range.min} - ${profile.ideal_weight_range.max} kg</strong></div>
                       <div class="health-metric"><span>Daily Calorie Need</span><strong>${profile.daily_calorie_need} kcal</strong></div>
                       <div class="suggestion-box">${profile.suggestion}</div>`
                    : `<p class="muted">No profile information saved yet.</p>
                       <p>Fill the form to see your BMI and ideal weight range.</p>`
                }
            </div>
        </div>
    `;
}

async function saveProfile() {
    const profile = {
        age:            Number(document.getElementById("profileAge").value),
        gender:         document.getElementById("profileGender").value,
        height_cm:      Number(document.getElementById("profileHeight").value),
        weight_kg:      Number(document.getElementById("profileWeight").value),
        activity_level: document.getElementById("profileActivity").value,
        target_weight:  Number(document.getElementById("profileTargetWeight").value)
    };
    await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify(profile)
    });
    renderProfile();
}
