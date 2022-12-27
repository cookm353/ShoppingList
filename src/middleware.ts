const { ExpressError } = require('./expressError')

function checkForItem(req, resp, next) {
    try {
        const name: string = req.params.name
        const item = items.find(item => item.name === name)

        if (!item) {
            throw new ExpressError("Invalid item name", 400)
        } else {
            return next()
        }
    } catch (err) {
        return next(err)
    }
}

module.exports = { checkForItem }