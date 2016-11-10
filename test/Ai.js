const assert = require('assert')
const R = require('ramda')
const Ai = require('../src/Ai')
const scenario = require('../scenario.json')
const serif = scenario.serif[0]
const initMessage = {
    value:'',
    option: {}
}

describe('Ai', () => {
    it('#create', ()=> {
        var ai = Ai.create(scenario)
        assert(ai)
    })
    describe('#input', ()=>{
        it('match input', done =>{
            var ai = Ai.create(scenario)
            var message = R.clone(initMessage)
            message.value = serif.input
            Ai.input(message, ai)
                .then(msg => {
                    assert(msg.value == serif.output, `${msg.value} : ${serif.output}`)
                    done()
                })
                .catch(done)
        })
        it('do not match input', done => {
            var ai = Ai.create(scenario)
            var message = R.clone(initMessage)
            Ai.input(message, ai)
                .then(message => {
                    assert(message.value == scenario.noMatch)
                    done()
                })
                .catch(done)
        })
    })
})
