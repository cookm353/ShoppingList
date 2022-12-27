const express = require('express')
const { checkForItem } = require('./middleware')

const router = express.Router()

interface item {
    "name": string,
    "price": number
}

let items: Array<item> = [
    {"name": "popsicle", "price": 1.45},
    {"name": "Cheerios", "price": 3.40}
]

// Get all items
router.get('/', (req, resp, next) => {
    return resp.json(items)
})

// Add an item
router.post('/', (req, resp) => {
    const newItem: item = {
        "name": req.body.name,
        "price": req.body.price
    }
    items.push(newItem)

    return resp.status(201).json({"added": newItem})
})

// Get an individual item
router.get("/:name", (req, resp, next) => {
    const name: string = req.params.name
    const item = items.find(item => item.name === name)
    
    if (item) {
        return resp.status(200).json(item)
    } else {
        console.log("Nope!")
    }

    return resp.status(404).json()
})

// Update an item
router.patch("/:name", (req, resp) => {
    const name: string = req.params.name
    const newName: string = req.body.name
    const newPrice: number = req.body.price

    const item = items.find(item => item.name === name)

    if ( !item ) {
        return resp.status(404).json()
    } else {
        item.name = newName
        item.price = newPrice
    
        return resp.json({"updated": item})
    }
})

// Remove an item
router.delete("/:name", (req, resp, next) => {
    const name: string = req.params.name

    const itemToDelete = items.find(item => item.name === name)

    if (!itemToDelete) {
        return next()
    } else {
        items = items.filter(item => item !== itemToDelete )
        console.log(items)
        return resp.json({"message": "Deleted"})
    }
})

module.exports = router