const assert = require('assert')
const Room = require('../src/Room')
const configOrigin = require('../config.json')
const config = configOrigin.test1

describe('Room', () => {
    it('#create', () => {
        assert(Room.create())
    })
    it('#add', () => {
        const before = Room.create()
        const after = Room.add(config, before)
        assert(Object.keys(after).length == Object.keys(before).length + 1)
    })
    describe('#remove', ()=>{
        it('When normal', ()=> {
            const test = Room.remove(config.id, Room.add(config, Room.create()))
            assert.deepEqual(test, Room.create())
        })
        it('When room is empty', () => {
            const testEmpty = Room.remove(config.name, Room.create())
            assert.deepEqual(testEmpty, Room.create())
        })
        it('When bot does not exist',()=>{
            const before = Room.add(config, Room.create())
            const after = Room.remove('flakjd', before)
            assert.deepEqual(after, before)
        })
    })
})
