addLayer("t", {
    name: "Time", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "time points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            description: "Double Production",
            cost: new Decimal(10),
        },
        12: {
            description: "x10 Production",
            cost: new Decimal(20),
        },
    }
})

addLayer("ach", {
    startData() { return {
        unlocked: true,
    }},
    color: "#C0C0C0",
    symbol: "A",
    row: "side",
    position: 0,
    name:"Achievements",
    tooltip: "Achievements",
    layerShown() {return true},
    achievements: {
        11: {
            name: "You started game!",
            done() {return new Decimal (player.time.upgrades.length).gte("1")},
            goalTooltip: "Buy Upgrade #1 for time layer",
            doneTooltip: "Buy Upgrade #1 for time layer (Completed)",
        },
        12: {
            name: "Are your strong",
            done() {return new Decimal (player.time.upgrades.length).gte("2")},
            goalTooltip: "Buy Upgrade #2 for time layer",
            doneTooltip: "Buy Upgrade #2 for time layer (Completed)",
        },
        13: {
            name: "Too many time points...",
            done() {return player.time.points.gte("1800")},
            goalTooltip: "Buy Upgrade #2 for time layer",
            doneTooltip: "Buy Upgrade #2 for time layer (Completed)",
        },
    }
})
