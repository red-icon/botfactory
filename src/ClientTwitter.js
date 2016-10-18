const EventEmitter = require('events')
const OAuth = require('oauth')
const Immutable = require('immutable')
const MessageTwitter = require('./MessageTwitter')

module.exports = class ClientTwitter extends EventEmitter {
    constructor(setting) {
        super()
        this.setting = Immutable.fromJS(setting)
        this.oauth = new OAuth.OAuth(
            'https://oauth.com/oauth/request_token',
            'https://oauth.com/oauth/access_token',
            this.setting.get('key'),
            this.setting.get('secret'),
            '1.0A',
            null,
            'HMAC-SHA1')
        this._parseStream = ClientTwitter.clojure_parseStream()
        this.receiveReply(this.setting.get('botname'))
    }

    send(text) {
        this.oauth.post(
            'https://api.twitter.com/1.1/statuses/update.json',
            this.setting.get('token'),
            this.setting.get('tokensecret'),
            {status: text},
            'UTF-8',
            (error, data, response)=> {
                if (error) {
                    console.log('oauth send error: ' + error + ' ' + data)
                    console.log('Status ' + response.statusCode)
                }
            }
        )
    }

    receiveReply(id) {
        var request = this.oauth.get(
            'https://stream.twitter.com/1.1/statuses/filter.json?track=' + id,
            this.setting.get('token'),
            this.setting.get('tokensecret'),
            null
        )
        request.on('response', response => {
            response.setEncoding('utf8')
            response.on('data', chunk => {
                //console.dir(chunk)
                var data = this._parseStream(chunk)
                if (data)
                    this.emit('receive', new MessageTwitter(data))
            })
            response.on('error', error => {
                this.emit('error', error)
            })
        })
        request.on('error', error => {
            this.emit('error', error)
        })
        request.end()
    }

    static clojure_parseStream() {
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
                    console.warn(error)
                }
            }
        }
    }
}

/*
 var Twitter = require('./ClientTwitter')
 var twitter = new Twitter(require('../setting.json').twitter, 'twitter')
 twitter.tweet('test ' + new Date().toString())
 */
