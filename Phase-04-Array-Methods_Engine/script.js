// ==========================================================================
// DATA REGISTRY ENGINE CORES
// ==========================================================================
let storeInventory = [
    { item: "Keyboard", price: 1000 },
    { item: "Mouse", price: 500 },
    { item: "Monitor", price: 12000 }
];

let cloudInventory = [
    { id: 1, name: "Premium Server", tier: "Enterprise", monthlyCost: 45000, active: true },
    { id: 2, name: "Basic Storage", tier: "Dev", monthlyCost: 1500, active: false },
    { id: 3, name: "API Gateway Node", tier: "Enterprise", monthlyCost: 12000, active: true },
    { id: 4, name: "Testing Sandbox", tier: "Dev", monthlyCost: 950, active: true },
    { id: 5, name: "Database Cluster", tier: "Enterprise", marketCapInCr: 85000, active: false }
];

let globalStocks = [
    { ticker: "TCS", exchange: "NSE", marketCapInCr: 12000, activeTrading: true },
    { ticker: "RELIANCE", exchange: "NSE", marketCapInCr: 18000, activeTrading: false },
    { ticker: "INFY", exchange: "NSE", marketCapInCr: 9000, activeTrading: true },
    { ticker: "APPLE", exchange: "NASDAQ", marketCapInCr: 95000, activeTrading: true }
];

// DOM Core Selectors Allocation
let rawMatrixView = document.querySelector("#raw-matrix-view");
let mapTerminal = document.querySelector("#map-terminal");
let filterTerminal = document.querySelector("#filter-terminal");
let reduceTerminal = document.querySelector("#reduce-terminal");

let mapBtn = document.querySelector("#run-map-btn");
let filterBtn = document.querySelector("#run-filter-btn");
let reduceBtn = document.querySelector("#run-reduce-btn");

// Initialization Setup: Boot representation display on dashboard
rawMatrixView.textContent = JSON.stringify(globalStocks, null, 2);

// ==========================================================================
// PIPELINE 01: THE .MAP() TRANSFORMATION
// ==========================================================================
mapBtn.addEventListener("click", function() {
    let inflatedInventory = storeInventory.map(function(data) {
        return { item: data.item, price: data.price * 1.15 };
    });
    mapTerminal.textContent = JSON.stringify(inflatedInventory, null, 2);
});

// ==========================================================================
// PIPELINE 02: THE .FILTER() EXTRACTION
// ==========================================================================
filterBtn.addEventListener("click", function() {
    let premiumNodes = cloudInventory.filter(function(data) {
        return data.tier === "Enterprise" && data.monthlyCost > 15000;
    });
    filterTerminal.textContent = JSON.stringify(premiumNodes, null, 2);
});

// ==========================================================================
// PIPELINE 03: THE .REDUCE() GRAND TRILOGY CHAIN
// ==========================================================================
reduceBtn.addEventListener("click", function() {
    let productionPricing = globalStocks
        .filter(function(data) {
            return data.exchange === "NSE" && data.activeTrading;
        })
        .map(function(data) {
            return Math.floor(data.marketCapInCr * 1.10);
        })
        .reduce(function(acc, current) {
            return acc + current;
        }, 0);

    reduceTerminal.textContent = `Grand Aggregate Total MarketCap: ${productionPricing} Cr`;
});