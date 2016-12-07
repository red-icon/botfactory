module.exports = class Error {
    static error(...errors){
        console.log('Debug!!')
        if(errors) errors.forEach(error => console.dir(error))
    }
}