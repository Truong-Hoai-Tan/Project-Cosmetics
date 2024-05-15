class ErrorReponse extends Error{
    constructor(statusCode , mesage){
        super(mesage);
        this.statusCode = statusCode;
    }
}
module.exports = ErrorReponse;