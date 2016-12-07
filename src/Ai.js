const R = require('ramda')

var Ai = {
    create(scenario) {
        return scenario
    },

    input(message, ai) {
        return new Promise((resolve, reject) => {
            var serif = R.find(data => new RegExp(data.input).test(message.value), ai.serif)
            message.value = serif ? serif.output : ai.noMatch
            resolve(message)
        })
    }
}

module.exports = R.map(R.curry, Ai)
