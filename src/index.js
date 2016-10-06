const setting = require('../setting.json')
const scenario = require('../scenario.json')
const TwitterClient = require('./TwitterClient')
const Ai = require('./Ai')

const twitter = new TwitterClient(setting.twitter, 'keke_moto')
const ai = new Ai(scenario)
const errorReport = function (error) {
    console.dir(error)
}

twitter.on('receive', data => {
    ai.input(data).then(twitter.send).catch(errorReport)
})
