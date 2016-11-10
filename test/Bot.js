const assert = require('assert')
const Bot = require('../src/Bot')
const config = require('../config.json')

describe('Bot', ()=> {
    it('#create', ()=> {
        var bot = Bot.create(config)
        assert(bot)
    })
})
