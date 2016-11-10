module.exports = class Error {
    static debug(){
        console.log('Debug')
        arguments.forEach((argument) => {
            console.dir(argument)
        })
    }
}