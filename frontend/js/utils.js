function todayText() {
    return new Date().toISOString().split("T")[0];
}

function formatDateText(dateText) {
    if (!dateText) return "-";
    return new Date(dateText).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function getExerciseLog() {
    return JSON.parse(
        localStorage.getItem(`exercise_${todayText()}`) ||
        '{"hours":0,"steps":0}'
    );
}

function saveExerciseLog(hours, steps) {
    localStorage.setItem(
        `exercise_${todayText()}`,
        JSON.stringify({ hours, steps })
    );
}

function getWeighPlan() {
    return JSON.parse(localStorage.getItem("weighPlan") || "null");
}

function getWeightHistory() {
    return JSON.parse(localStorage.getItem("weightHistory") || "[]");
}

function saveWeightEntry(date, weight) {
    const history = getWeightHistory();
    const existing = history.findIndex(e => e.date === date);
    if (existing >= 0) {
        history[existing].weight = weight;
    } else {
        history.push({ date, weight });
    }
    history.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("weightHistory", JSON.stringify(history));
}

function calculateNextWeighDate(lastDate, timeText) {
    if (!lastDate) return "-";
    const date = new Date(lastDate);
    date.setMonth(date.getMonth() + 1);
    const datePart = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    });
    return `${datePart}${timeText ? " at " + timeText : ""}`;
}

function offsetDate(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
}
