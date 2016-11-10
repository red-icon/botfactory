const Bot = require('./Bot')
const Immutable = require('immutable')

module.exports = {
    create(){
        return Immutable.Map({})
    },

    add(room, config){
        return room.set(config.name, Bot.create(config))
    },

    remove(room, name){
        return room.delete(name)
    }
}