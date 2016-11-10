const EventEmitter = require('events')
const OAuth = require('oauth')
const R = require('ramda')
const Error = require('../Error')

var Twitter = {
    create(config){
        return R.pipe(
            Twitter._init,
            Twitter._emitReceive
        )(config)
    },

    _init(config){
        var oauth = new OAuth.OAuth(
            'https://oauth.com/oauth/request_token',
            'https://oauth.com/oauth/access_token',
            config.key,
            config.secret,
            '1.0A',
            null,
            'HMAC-SHA1')
        var twitter = new EventEmitter()
        twitter.config = config
        twitter.oauth = oauth
        return R.clone(twitter)
    },

    _emitReceive(twitter){
        var stream2message = R.compose(Twitter._filter, Twitter.__parseStream())
        var request = twitter.oauth.get(
            'https://userstream.twitter.com/1.1/user.json?replies=all&track=' + twitter.config.botName,
            twitter.config.token,
            twitter.config.tokenSecret,
            null
        )
        request.on('response', response => {
            response.setEncoding('utf8')
            response.on('data', chunk => {
                if (data)
                    twitter.emit('receive', stream2message(data))
            })
            response.on('error', error => {
                twitter.emit('error', error)
            })
        })
        request.on('error', error => {
            twitter.emit('error', error)
        })
        request.end()
        return twitter
    },

    _filter(originData){
        var message = {}
        message.value = originData.text
        message.option.destination = originData.user.screen_name
        return message
    },

    //Closure
    __parseStream(){
        var buff = ""
        return function (data) {
            var index, json = ''
            buff += data
            while ((index = buff.indexOf("\r\n")) > -1) {
                json = buff.slice(0, index)
                buff = buff.slice(index + 2)
            }

            if (json.length > 0) {
                try {
                    return JSON.parse(json)
                } catch (error) {
                    Error.debug(error)
                }
            }
        }
    }
}

module.exports = R.map(R.curry, Twitter)
