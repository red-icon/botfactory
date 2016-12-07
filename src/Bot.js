const Path = require('path')
const R = require('ramda')
const Ai = require('./Ai')
const Error = require('./lib/Error')
const Utility = require('./lib/Utility')

const defaultAdopters = ['twitter']

const Bot = {
    create(config){
        return Utility.mapObj(Bot._createAdopter(config.scenario, defaultAdopters))(config.adopters)
    },

    _createAdopter: R.curry((scenario, defaultAdopters, config, path)=>{
        path = R.any(R.equals(path), defaultAdopters) ? Path.join(__dirname, 'adopters', path) : path
        const Adopter = require(path)
        const inputAi = Ai.input(R.__, Ai.create(scenario))
        return R.pipe(
            Adopter.create,
            adopter => Utility.on('receive', R.composeP(Adopter.send(R.__, adopter), inputAi), adopter)//,
            // Utility.on('error', Error.error)
        )(config)
    }),
}

module.exports = R.map(R.curry, Bot)
