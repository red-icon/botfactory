const assert = require('assert')
const ClientTwitter = require('../src/ClientTwitter')
const MessageTwitter = require('../src/MessageTwitter')

describe('ClientTwitter', function () {
    const twitter = new ClientTwitter(require('../setting.json').twitter, 'twitter')
    it('#event receive', function (done) {
        //If twitter don't receive tweet, this test suit fail
        twitter.once('receive', message => {
            assert(message instanceof MessageTwitter)
            done()
        })
    })
})
