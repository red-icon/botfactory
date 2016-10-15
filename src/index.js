const setting = require('../setting.json')
const scenario = require('../scenario.json')
const ClientTwitter = require('./ClientTwitter')
const Ai = require('./Ai')

const twitter = new ClientTwitter(setting.twitter, 'keke_moto')
const ai = new Ai(scenario)
const errorReport = function (error) {
    console.dir(error)
}

twitter.on('receive', message => {
    console.log(message.format('test'))
    ai.input(message.value).then(message.format.bind(message)).then(twitter.send.bind(twitter)).catch(errorReport)
})
twitter.on('error', errorReport)

/*
//test
var Message = require('./MessageTwitter')
const data = {text:'test', user:{screen_name:'Tester0118'}}
const message = new Message(data)
twitter.emit('receive', message)
*/
