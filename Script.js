// Database with exact rarity tiers, world exist counts, demand out of 10, and values
const brainrots = [
    { name: "Strawberry Elephant", rarity: "OG", value: 4550000, existCount: 1264, demandOutOf10: 10, stability: "Stable" },
    { name: "Headless Horseman", rarity: "OG", value: 875000, existCount: 150, demandOutOf10: 10, stability: "Rising" },
    { name: "Griffin", rarity: "Secret", value: 4400000, existCount: 5200, demandOutOf10: 10, stability: "Rising" },
    { name: "Hydra Dragon Cannelloni", rarity: "Secret", value: 7500, existCount: 8400, demandOutOf10: 10, stability: "Rising" },
    { name: "Dragon Gingerini", rarity: "Secret", value: 40000, existCount: 9100, demandOutOf10: 9, stability: "Stable" },
    { name: "Dragon Aquanini", rarity: "Secret", value: 375000, existCount: 6500, demandOutOf10: 9, stability: "Stable" },
    { name: "Meowl", rarity: "OG", value: 75000, existCount: 2110, demandOutOf10: 8, stability: "Stable" },
    { name: "John Pork", rarity: "OG", value: 500000, existCount: 1800, demandOutOf10: 8, stability: "Rising" },
    { name: "Skibidi Toilet", rarity: "OG", value: 450000, existCount: 2538, demandOutOf10: 5, stability: "Falling" },
    { name: "Odin Din Din Dun", rarity: "Brainrot God", value: 95000, existCount: 15000, demandOutOf10: 6, stability: "Stable" },
    { name: "Tralalero Tralala", rarity: "Brainrot God", value: 90000, existCount: 16200, demandOutOf10: 7, stability: "Rising" },
    { name: "Dragon Cannelloni", rarity: "Secret", value: 3400, existCount: 14000, demandOutOf10: 10, stability: "Stable" },
    { name: "Cerberus", rarity: "Secret", value: 1650000, existCount: 12000, demandOutOf10: 3, stability: "Falling" },
    { name: "Antonio", rarity: "Brainrot God", value: 70000, existCount: 19500, demandOutOf10: 6, stability: "Stable" }
];

// --- AUTO-CALCULATING SCORING ENGINE ---
function calculateOverallScore(item) {
    // 1. Rarity Multipliers (God = 1x, Secret = 10x, OG = 15x)
    let rarityMultiplier = 1.0;
    if (item.rarity.includes("OG")) {
        rarityMultiplier = 15.0;
    } else if (item.rarity.includes("Secret")) {
        rarityMultiplier = 10.0;
    } else if (item.rarity.includes("Brainrot God")) {
        rarityMultiplier = 1.0;
    }

    // 2. How easy is it to get based on world exist counts? (Fewer in the world = harder to get = higher score)
    let difficultyMultiplier = Math.max(1, 100000 / (item.existCount + 200));

    // 3. Demand out of 10 (A 10 adds a massive boost to the score)
    // We square or scale the demand so a 10/10 creates a huge competitive advantage for dragons/og items
    let demandMultiplier = Math.pow(item.demandOutOf10, 1.6) / 5;

    // 4. Stability Modifier
    let stabilityMultiplier = 1.0;
    if (item.stability === "Rising") stabilityMultiplier = 1.3;
    else if (item.stability === "Falling") stabilityMultiplier = 0.7;

    // 5. Value Scaler
    let valueLog = Math.log10(item.value + 1) * 8;

    // COMBINED OVERALL SCORE FORMULA
    let rawScore = (valueLog + difficultyMultiplier) * rarityMultiplier * demandMultiplier * stabilityMultiplier / 150;
    return parseFloat(rawScore.toFixed(1));
}

// Process data, calculate scores, and sort by meta rank
function processAndDisplay() {
    brainrots.forEach(item => {
        item.score = calculateOverallScore(item);

        // Categorize demand text for color badges
        if (item.demandOutOf10 >= 9) {
            item.demandText = `${item.demandOutOf10}/10 (Extreme)`;
            item.demandClass = "demand-extreme";
        } else if (item.demandOutOf10 >= 7) {
            item.demandText = `${item.demandOutOf10}/10 (High)`;
            item.demandClass = "demand-high";
        } else if (item.demandOutOf10 >= 4) {
            item.demandText = `${item.demandOutOf10}/10 (Med)`;
            item.demandClass = "demand-med";
        } else {
            item.demandText = `${item.demandOutOf10}/10 (Low)`;
            item.demandClass = "demand-low";
        }

        item.stabilityText = item.stability === "Rising" ? "↗️ Rising" :
                             item.stability === "Stable" ? "➡️ Stable" : "↘️ Falling";

        item.stabilityClass = item.stability === "Rising" ? "status-rising" :
                              item.stability === "Stable" ? "status-stable" : "status-falling";
    });

    // Sort automatically by the Overall Score from highest to lowest
    brainrots.sort((a, b) => b.score - a.score);

    // Assign final ranks based on sorted order
    brainrots.forEach((item, index) => {
        item.rank = index + 1;
    });

    displayTable(brainrots);
}

function displayTable(data) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    data.forEach(item => {
        const scoreClass = item.score >= 100 ? "score-elite" : "score-normal";
        const row = `
            <tr>
                <td>#${item.rank}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.rarity}</td>
                <td>${item.value.toLocaleString()}</td>
                <td>${item.existCount.toLocaleString()}</td>
                <td><span class="${item.demandClass}">${item.demandText}</span></td>
                <td><span class="${item.stabilityClass}">${item.stabilityText}</span></td>
                <td><span class="${scoreClass}">${item.score >= 100 ? '🔥 ' : ''}${item.score}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function filterTable() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const rarityFilter = document.getElementById("rarityFilter").value;

    const filtered = brainrots.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchInput);
        const matchesRarity = rarityFilter === "ALL" || item.rarity === rarityFilter;
        return matchesSearch && matchesRarity;
    });

    displayTable(filtered);
}

// Run everything on page load
processAndDisplay();
