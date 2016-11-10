const assert = require('assert')
const Twitter = require('../../src/adopters/twitter')
const config = require('../../config.json')

describe('adopter twitter', ()=>{
    it('#create', ()=>{
        var twitter = Twitter.create(config.adopters.twitter)
        assert(twitter)
    })
    it('#send', (done)=>{
        var twitter = Twitter.create(config.adopters.twitter)
        twitter.on('receive', ()=>{
            done()
        })
        twitter.on('error', ()=>{
            done(-1)
        })
        twitter.send('test')
    })
})
