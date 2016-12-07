const Bot = require('./Bot')
const R = require('ramda')

const Room = {
    create(){
        return {}
    },

    add(config, room){
        return R.assoc(R.prop('id')(config), Bot.create(config), room)
    },

    remove(id, room){
        return R.dissoc(id, room)
    }
}

module.exports = R.map(R.curry, Room)
