const EventEmitter = require('events')
const OAuth = require('oauth')
const Immutable = require('immutable')

var Twitter = {
    create(config){
        var oauth = new OAuth.OAuth(
            'https://oauth.com/oauth/request_token',
            'https://oauth.com/oauth/access_token',
            config.key,
            config.secret,
            '1.0A',
            null,
            'HMAC-SHA1')
        Twitter._emitReceive(oauth, config)
        return Immutable.fromJS(oauth)
    },

    _emitReceive(oauth, config){
        var request = oauth.get(
            'https://userstream.twitter.com/1.1/user.json?replies=all&track=' + id,
            config.token,
            config.tokenSecret,
            null
        )
        request.on('response', response => {
            response.setEncoding('utf8')
            response.on('data', chunk => {
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
}

module.exports = Twitter

