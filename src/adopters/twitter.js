const EventEmitter = require('events')
const OAuth = require('oauth')
const R = require('ramda')
const Utility = require('../lib/Utility')

const Twitter = {
    create(config){
        return R.pipe(
            Twitter._init,
            Twitter._emitReceive
        )(config)
    },

    send(message, twitter){
        console.log('send')
        const text = '@' + R.path(['option', 'destination'], message) + ' ' + R.prop('value', message)
        Twitter._tweet(text, twitter)
        return twitter
    },

    _tweet(text, twitter){
        console.log('tweet')
        twitter.oauth.post(
            'https://api.twitter.com/1.1/statuses/update.json',
            R.path(['config', 'token'])(twitter),
            R.path(['config', 'tokenSecret'])(twitter),
            {status: text},
            'UTF-8',
            (error, data, response) => error ? twitter.emit('sent', data) : twitter.emit('error', error, response)
        )
        console.log('tweet after')
        return twitter
    },

    _init(config){
        console.log('init')
        const oauth = new OAuth.OAuth(
            'https://oauth.com/oauth/request_token',
            'https://oauth.com/oauth/access_token',
            config.key,
            config.secret,
            '1.0A',
            null,
            'HMAC-SHA1')
        const twitter = new EventEmitter()
        twitter.config = config
        twitter.oauth = oauth
        return R.clone(twitter)
    },

    _emitReceive(twitter){
        console.log('emit receive')
        const request = twitter.oauth.get(
            'https://userstream.twitter.com/1.1/user.json?replies=all&track=' + twitter.config.botName,
            twitter.config.token,
            twitter.config.tokenSecret,
            null
        )
        request.on('response', response => {
            response.setEncoding('utf8')
            response.on('data', chunk => {
                    R.when(
                        Twitter.__parseStream(),
                        // R.compose(Utility.emit(twitter, 'receive'), Twitter._filter)
                        R.compose(Utility.emit(twitter, 'receive'), Utility.debugRelay('check2'), Twitter._filter, Utility.debugRelay('check1'))
                    )
                    (chunk)
                }
            )
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
        console.log('filter')
        const message = {}
        message.value = originData.text
        message.option.destination = originData.user.screen_name
        return message
    },

    //Closure
    __parseStream(){
        let buff = ""
        return function (data) {
            console.log('parse')
            if (!data) return false
            let index, json = ''
            buff += data
            while ((index = buff.indexOf("\r\n")) > -1) {
                json = buff.slice(0, index)
                buff = buff.slice(index + 2)

                if (json.length > 0) {
                    try {
                        return JSON.parse(json)
                    } catch (error) {
                        console.warn(error)
                        return false
                    }
                }
            }
        }
    },
}

module.exports = R.map(R.curry, Twitter)
