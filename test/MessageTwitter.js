const assert = require('assert')
const MessageTwitter = require('../src/adopters/MessageTwitter')

describe('MessageTwitter', function () {
    const data = {text:'text',user:{screen_name:'name'}}
    const message = new MessageTwitter(data)
    it('#value', function () {
        assert(message.value === data.text)
    })
    it('#format', function () {
        assert(message.format('test') === '@name test')
    })
})
