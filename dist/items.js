class Item {
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
class ItemList {
    /* Class representing a shopping list */
    items = [];
    constructor() {
        const popsicle = new Item("popsicle", 1.45);
        const cheerios = new Item("Cheerios", 3.40);
        this.items.push(popsicle);
        this.items.push(cheerios);
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
        // console.log("Name: ", name)
        return this.items.find(item => item.name === name);
    }
    getAll() {
        // Retrieve all items
        return this.items;
    }
    update(item, reqBody) {
        // Update an item's properties
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
