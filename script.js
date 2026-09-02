// Database of top brainrots scaled up to a full list framework
const brainrots = [
    { rank: 1, name: "Headless Horseman", rarity: "OG", value: "45,000", demand: "High", lity: "↗️ Rising", stabilityClass: "status-rising", score: 145.2 },
    { rank: 2, name: "Spyder Elephant", rarity: "OG", value: "50,000", demand: "Extreme", demandClass: "demand-extreme", stability: "➡️ Stable", stabilityClass: "status-stable", score: 143.1 },
    { rank: 3, name: "Strawberry Elephant", rarity: "OG", value: "45,500", demand: "High", demandClass: "demand-high", stability: "➡️ Stable", stabilityClass: "status-stable", score: 120.4 },
    { rank: 4, name: "Meowl", rarity: "OG", value: "27,000", demand: "High", demandClass: "demand-high", stability: "➡️ Stable", stabilityClass: "status-stable", score: 105.3 },
    { rank: 5, name: "John Pork", rarity: "OG", value: "24,000", demand: "High", demandClass: "demand-high", stability: "↗️ Rising", stabilityClass: "status-rising", score: 94.4 },
    { rank: 6, name: "Skibidi Toilet", rarity: "OG", value: "21,600", demand: "Medium", demandClass: "demand-med", stability: "↘️ Falling", 
    { rank: 7, name: "Hydra Dragon Cannelloni", rarity: "Secret", value: "15,000", demand: "High", demandClass: "demand-high", stability: "↗️ Rising", stabilityClass: "status-rising", score: 63.6 },
    { rank: 8, name: "Dragon Gingerini", rarity: "Secret", value: "12,500", demand: "Medium", demandClass: "demand-med", stability: "➡️ Stable", stabilityClass: "status-stable", score: 54.5 },
    { rank: 9, name: "Griffin", rarity: "Secret", value: "11,250", demand: "High", demandClass: "demand-high", stability: "↗️ Rising", stabilityClass: "status-rising", 
    data.forEach(item => {
        const scoreClass = item.score >= 100 ? "score-elite" : "score-normal";
        const row = `
            <tr>
                <td>#${item.rank}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.rarity}</td>
                <td>${item.value}</td>
                <td><span class="${item.demandClass}">${item.demand}</span></td>
                <td><span class="${item.stabilityClass}">${item.stability}</span></td>
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

// Initialize on page load
displayTable(brainrots);
