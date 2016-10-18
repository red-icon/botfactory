const assert = require('assert')
const ClientTwitter = require('../src/ClientTwitter')
const MessageTwitter = require('../src/MessageTwitter')

const setting = require('../setting.json').twitter
setting.botname = "twitter"

describe('ClientTwitter', function () {
    const twitter = new ClientTwitter(setting)
    it('#event receive', function (done) {
        //If twitter don't receive tweet, this test suit fail
        twitter.once('receive', message => {
            assert(message instanceof MessageTwitter)
            done()
        })
    })
})
