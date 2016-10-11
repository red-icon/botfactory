const Client = require('./interface/Clinet')
const OAuth = require('oauth')

module.exports = class TwitterClient extends Client {
    constructor(setting, id) {
        super()
        this.key = setting.key
        this.secret = setting.secret
        this.token = setting.token
        this.tokensecret = setting.tokensecret
        this.oauth = new OAuth.OAuth(
            'https://oauth.com/oauth/request_token',
            'https://oauth.com/oauth/access_token',
            this.key,
            this.secret,
            '1.0A',
            null,
            'HMAC-SHA1')
        this._parseStream = TwitterClient.clojure_parseStream()
        this.receiveReply(id)
    }

    send(text) {
        this.oauth.post(
            'https://api.twitter.com/1.1/statuses/update.json',
            this.token,
            this.tokensecret,
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
            this.token,
            this.tokensecret,
            null
        )
        request.on('response', response => {
            response.setEncoding('utf8')
            response.on('data', chunk => {
                //console.dir(chunk)
                var data = this._parseStream(chunk)
                if (data)
                    this.emit('receive', data)
            })
            response.on('end', chunk => {
                console.dir(chunk)
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
            var index,json = ''
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

var Twitter = require('./TwitterClient')
var twitter = new Twitter(require('../setting.json').twitter, 'twitter')
twitter.on('receive', data => {
    console.dir(data)
})
