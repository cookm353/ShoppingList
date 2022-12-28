const express = require('express')
const checkForItem = require('./middleware')
const ItemList = require("./items")
const ExpressError = require("./expressError")

const router = express.Router()
const itemList = new ItemList()

// Get all items
router.get('/', (req, resp) => {
    return resp.json(itemList.getAll())
})

// Add an item
router.post('/', (req, resp, next) => {
    try {
        if (!req.body.name) {
            throw new ExpressError("Name and price are required", 400)
        }
        const name = req.body.name
        const price = req.body.price
        const newItem = itemList.add(name, price)
    
        return resp.status(201).json({"added": newItem})
    } catch (err) {
        next(err)
    }
    
})

// Get an individual item
router.get("/:name", checkForItem, (req, resp, next) => {
    const name: string = req.params.name
    const item: Item = itemList.get(name)
    return resp.status(200).json(item)
})

// Update an item
router.patch("/:name", checkForItem, (req, resp) => {
    const name: string = req.params.name
    const item: Item = itemList.get(name)
    return resp.json(itemList.update(item,req.body))
})

// Remove an item
router.delete("/:name", checkForItem, (req, resp, next) => {
    const name: string = req.params.name
    const itemToDelete: Item = itemList.get(name)

    itemList.remove(itemToDelete)
    return resp.json({"message": "Deleted"})
})

module.exports = router