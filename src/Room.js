const Bot = require('./Bot')
const R = require('ramda')

var Room = {
    create(){
        return R.clone({})
    },

    add(config, room){
        room[config.name] = Bot.create(config)
        return room
    },

    remove(room, name){
        delete room[name]
        return room
    }
}

module.exports = R.map(R.curry, Room)
