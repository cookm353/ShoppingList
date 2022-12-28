const ExpressError = require('./expressError')
const ItemList = require("./items")

const itemList = new ItemList()

function checkForItem(req, resp, next) {
    const item = itemList.get(req.params.name)
    try {

        if (!item) {
            throw new ExpressError("Invalid item name", 400)
        } else {
            return next()
        }
    } catch (err) {
        return next(err)
    }
}

module.exports = checkForItem