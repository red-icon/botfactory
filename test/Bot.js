const assert = require('assert')
const {Bot} = require('../src/Bot')

describe('Bot', ()=> {
    it('#create', ()=> {
        var bot = Bot.create(config)
        assert(bot)
    })

    it('#stop', ()=>{
        var bot = Bot.stop(Bot.create(config))
        assert(!bot)
    })
})
