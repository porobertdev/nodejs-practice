class CustomError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;
        this.name = msg;
    }
}

module.exports = CustomError;