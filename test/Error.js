const assert = require('assert')
const Error = require('../src/Error')

describe('Error', ()=> {
    it('#debug', ()=> {
        Error.debug('test', {message: 'test'})
    })
})
