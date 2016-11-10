const assert = require('assert')
const Ai = require('../src/Ai')
const scenario = require('../scenario.json')
const serif = scenario.serif

describe('Ai', function () {
    var ai = new Ai(scenario)
    describe('#input', function () {
        it('macth input', function (done) {
            ai.input('aaaa' + serif[0].input + 'aaaa')
                .then(data => {
                    assert(data === serif[0].output)
                    done()
                })
                .catch(done)
        })
        it('do not match input', function (done) {
            ai.input('')
                .then(data => {
                    assert(data === scenario.noMatch)
                    done()
                })
                .catch(done)
        })
    })
})
