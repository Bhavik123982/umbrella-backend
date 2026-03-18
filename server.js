async function startPractice() {
    // 1. Get values from your dropdowns/selection
    const task = document.getElementById("task-select")?.value || "task1";
    const level = document.getElementById("level-select")?.value || "easy";
    const displayElement = document.getElementById("question-display");

    if (displayElement) {
        displayElement.innerText = "Loading question...";
    }

    try {
        // 2. FETCH from your LIVE Render backend
        const response = await fetch(`https://umbrella-backend-y6lp.onrender.com{task}/${level}`);
        
        if (!response.ok) throw new Error("Backend error");

        const data = await response.json();

        // 3. SHOW the question in your HTML
        if (displayElement) {
            displayElement.innerText = data.prompt;
        } else {
            console.error("Error: Could not find an element with id='question-display'");
        }

    } catch (error) {
        console.error("Fetch error:", error);
        if (displayElement) {
            displayElement.innerText = "Failed to load question. Please try again.";
        }
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
