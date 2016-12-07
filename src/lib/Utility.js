const R = require('ramda')

const Utility = {
    on(eventName, listener, target){
        target.on(eventName, listener)
        return target
    },

    emit(emitter, eventName, ...data){
        emitter.emit.apply(emitter, R.concat(eventName, data))
        return data
    },

    mapObj(fn, obj){
        let newObj = {}
        for (let key in obj){
            newObj[key] = fn(obj[key], key)
        }
        return newObj
    },

    debugRelay(...data){
        console.dir(data)
        return data[data.length-1]
    }
}
module.exports = R.map(R.curry, Utility)
