const Ai = require('./Ai')
const Error = require('./Error')
const Path = require('path')
const Immutable = require('immutable')

const defaultAdopter = ['twitter']

module.exports = {
    create(config) {
        var ai = new Ai(require(config.scenario))
        return Immutable.fromJS(config.adopters.map(adopterConfig => {
            var adopterPath = ''
            if(-1 == defaultAdopter.indexOf(adopterConfig.name)){
                adopterPath = adopterConfig.name
            } else {
                adopterPath = Path.join(__dirname, 'adopters', adopterConfig.name)
            }

            try {
                var Adopter = require(adopterPath)
            }catch(error){
                throw new Error('Adopter path is wrong : ' + adopterConfig.name)
            }
            var adopter = new Adopter(adopterConfig.config)
            adopter.on('receive', message => {
                ai.input(message.value)
                    .then(answer => adopter.send(answer, message.option))
                    .then(() => {
                        message = null
                    })
                    .catch(Error.debug)
            })
            adopter.on('error', Error.debug)
            return adopter
        }))
    }
}