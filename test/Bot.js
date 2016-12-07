const assert = require('assert')
const Bot = require('../src/Bot')
const configOrigin = require('../config.json')
const config = configOrigin.test1

describe('Bot', ()=> {
    it('#create', ()=> {
        let bot = Bot.create(config)
        assert(bot)
        bot = null
    })
})
