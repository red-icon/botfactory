module.exports = class Ai {
    constructor(scenario) {
        this.scenario = scenario
        this.serif = scenario.serif
    }

    input(input) {
        return new Promise((resolve, reject) => {
            this.serif.forEach(data => {
                if (input.match(data.input)) {
                    resolve(data.output)
                }
            })
            resolve(this.scenario.noMatch)
        })
    }
}