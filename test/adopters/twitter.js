const assert = require('assert')
const Twitter = require('../../src/adopters/twitter')
const configOrigin = require('../../config.json')
const config = configOrigin.adopters.twitter

describe('adopter twitter', ()=>{
    it('#create', ()=>{
        var twitter = Twitter.create(config)
        assert(twitter)
    })
    it('#send', (done)=>{
        var twitter = Twitter.create(config)
        twitter.on('receive', ()=>{
            done()
        })
        twitter.on('error', ()=>{
            done(-1)
        })
        twitter.send('test')
    })
})
