class ItemList {
    /* Class representing a shopping list */
    items = [];
    constructor() {
        this.items = [
            { "name": "popsicle", "price": 1.45 },
            { "name": "Cheerios", "price": 3.40 }
        ];
    }
    add(name, price) {
        // Add a new item to the shopping list
        const newItem = {
            "name": name,
            "price": price
        };
        this.items.push(newItem);
        return newItem;
    }
    get(name) {
        // Retrieve an item if it exists
        console.log("Name: ", name);
        return this.items.find(item => item.name === name);
    }
    getAll() {
        // Retrieve all items
        return this.items;
    }
    update(item, reqBody) {
        // Update an item's properties
        console.log(reqBody.name);
        if (reqBody.name) {
            item.name = reqBody.name;
        }
        if (reqBody.price) {
            item.price = reqBody.price;
        }
        return { "updated": item };
    }
    remove(itemToDelete) {
        // Remove an item from the list
        this.items = this.items.filter(item => item !== itemToDelete);
        return { "message": "Deleted" };
    }
}
module.exports = ItemList;
