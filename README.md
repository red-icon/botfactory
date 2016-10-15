# BotFactory
This make BotGame.

## Usage
```
git clone https://github.com/red-icon/botfactory.git
cd botfactory
npm install
```

Please make setting.json

```
// setting.json
{
    "twitter": [
        {
            "key": "Consumer Key",
            "secret": "Consumer Secret",
            "token": "Access Token",
            "tokensecret": "Access Token Secret"
        }
    ]
}
```
Please change [scenario.json](./secnario.json)

```
node src/index
```

## License
[GPL-3.0](./LICENSE)
