const assert = require('assert')
const Room = require('../src/Room')
const config = require('../config.json')

describe('Room', () => {
    it('#create', () => {
        assert(Room.create())
    })
    it('#add', () => {
        var before = Room.create()
        var after = Room.add(before, config)
        assert(after.size == before.size + 1)
    })
    describe('#remove', ()=>{
        it('When normal', ()=> {
            var test = Room.remove(config.name, Room.add(config, Room.create()))
            assert.deepEqual(test, Room.create())
        })
        it('When room is empty', () => {
            var testEmpty = Room.remove(config, Room.create())
            assert.deepEqual(testEmpty, Room.create())
        })
        it('When bot does not exist',()=>{
            var before = Room.add(config, Room.create())
            var after = Room.remove('flakjd', before)
            assert.deepEqual(after, before)
        })
    })
})
