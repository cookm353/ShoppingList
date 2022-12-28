const express = require('express');
const checkForItem = require('./middleware');
const ItemList = require("./items");
const ExpressError = require("./expressError");
const router = express.Router();
const itemList = new ItemList();
// Get all items
router.get('/', (req, resp, next) => {
    return resp.json(itemList.getAll());
});
// Add an item
router.post('/', (req, resp) => {
    const name = req.body.name;
    const price = req.body.price;
    const newItem = itemList.add(name, price);
    return resp.status(201).json({ "added": newItem });
});
// Get an individual item
router.get("/:name", checkForItem, (req, resp, next) => {
    const name = req.params.name;
    const item = itemList.get(name);
    return resp.status(200).json(item);
    // try {
    //     if (!item) {
    //         throw new ExpressError("Invalid item name", 400)
    //     } else {
    //         return resp.status(200).json(item)
    //     }
    // } catch(err) {
    //     return next(err)
    // }
    // return resp.status(404).json()
});
// Update an item
router.patch("/:name", checkForItem, (req, resp) => {
    const name = req.params.name;
    const item = itemList.get(name);
    return resp.json(itemList.update(item, req.body));
    if (!item) {
        return resp.status(404).json();
    }
    else {
        return resp.json(itemList.update(item, req.body));
    }
});
// Remove an item
router.delete("/:name", checkForItem, (req, resp, next) => {
    const name = req.params.name;
    const itemToDelete = itemList.get(name);
    itemList.remove(itemToDelete);
    return resp.json({ "message": "Deleted" });
});
module.exports = router;
