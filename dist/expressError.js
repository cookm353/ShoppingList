class ExpressError extends Error {
    msg;
    status;
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack);
    }
}
module.exports = ExpressError;
