const assert = require('assert')
const R = require('ramda')
const Twitter = require('../../src/adopters/twitter')
const Utility = require('../../src/lib/Utility')
const configOrigin = require('../../config.json')
const config = configOrigin.test1.adopters.twitter
const Message = {
    value: '',
    option: {
        destination: ''
    }
}

describe('adopter/twitter', ()=>{
    it('#create', ()=>{
        const twitter = Twitter.create(config)
        assert(twitter)
    })
    // it('#send', (done)=>{
    //     let message = R.clone(Message)
    //     message.value = 'Sorry. I mistaked destination. ' + new Date().toISOString()
    //     message.option.destination = 'Tester01182'
    //     R.pipe(
    //         Twitter.create,
    //         Utility.on('sent', ()=>{done()}),
    //         Utility.on('error', done),
    //         Twitter.send(message)
    //     )(config)
    // })
    // it('#receive', done => {
    //     var message = R.clone(Message)
    // })
})
