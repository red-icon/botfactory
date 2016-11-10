const Ai = require('./Ai')
const {Error} = require('./Error')

module.exports = class Bot {
    static create(config) {
        var ai = new Ai(require(config.scenario))
        return config.adopters.map(adopterConfig => {
            var Adopter = require(adopterConfig.source)
            var adopter = new Adopter(adopterConfig.config)
            adopter.on('receive', message => {
                ai.input(message.value)
                    .then(answer => adopter.send(answer, message.option))
                    .catch(Error.debug)
            })
            adopter.on('error', Error.debug)
            return adopter
        })
    }

    static stop(bot) {
        bot = null
        return bot
    }
}