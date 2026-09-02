const express = require('express');
const app = express();

// Simulated AI Market Scanner & Scorer
async function runAIBrainrotEvaluator() {
    // In a live app, this fetches recent trading posts, offer channels, and game data.
    let liveMarketData = [
        { name: "Strawberry Elephant", rarity: "OG", baseVal: 4550000, existCount: 1264 },
        { name: "Griffin", rarity: "Secret", baseVal: 4400000, existCount: 5200 },
        { name: "Headless Horseman", rarity: "OG / Event", baseVal: 875000, existCount: 150 },
        { name: "Skibidi Toilet", rarity: "OG", baseVal: 450000, existCount: 2538 }
    ];

    let evaluatedItems = liveMarketData.map(item => {
        // AI simulates checking recent trade offers and demand velocity
        let simulatedDemand = item.existCount < 500 ? "Extreme" : "High";
        let simulatedStability = item.baseVal > 1000000 ? "Rising" : "Stable";

        // Weights
        let rarityMultiplier = item.rarity.includes("OG") ? 4.0 : 2.5;
        let scarcityScore = Math.max(1, 40000 / (item.existCount + 50));
        let demandMultiplier = simulatedDemand === "Extreme" ? 2.2 : 1.5;
        let stabilityMultiplier = simulatedStability === "Rising" ? 1.3 : 1.0;
        let valueLog = Math.log10(item.baseVal + 1) * 10;

        // COMBINED OVERALL SCORE (The main thing you look at)
        let overallScore = parseFloat((
            (valueLog + scarcityScore) * rarityMultiplier * demandMultiplier * stabilityMultiplier / 10
        ).toFixed(1));

        return {
            name: item.name,
            rarity: item.rarity,
            value: item.baseVal,
            exists: item.existCount,
            demand: simulatedDemand,
            stability: simulatedStability,
            score: overallScore // Primary master score combining everything!
        };
    });

    // Automatically sort by Overall Score highest to lowest
    evaluatedItems.sort((a, b) => b.score - a.score);
    return evaluatedItems;
}

// API endpoint that your frontend website calls to get the auto-updated data
app.get('/api/brainrots', async (req, res) => {
    const sortedData = await runAIBrainrotEvaluator();
    res.json(sortedData);
});

app.listen(3000, () => console.log('AI Market Evaluator running on port 3000'));
