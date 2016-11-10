module.exports = class Error {
    static debug(...errors){
        console.log('Debug')
        if(errors) errors.forEach(error => console.dir(error))
    }
}