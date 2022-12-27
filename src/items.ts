interface Item {
    "name": string,
    "price": number
}

class ItemList {
    /* Class representing a shopping list */
    items: Array<Item> = []
    
    constructor() {
        this.items = [
            {"name": "popsicle", "price": 1.45},
            {"name": "Cheerios", "price": 3.40}
        ]
    }

    add(name: string, price: number): object {
        // Add a new item to the shopping list
        const newItem: Item = {
            "name": name,
            "price": price
        }

        this.items.push(newItem)
        return newItem
    }

    get(name: string): Item | undefined {
        // Retrieve an item if it exists
        console.log("Name: ", name)
        return this.items.find(item => item.name === name)
    }

    getAll(): Array<Item> {
        // Retrieve all items
        return this.items
    }

    update(item: Item, reqBody: object): object {
        // Update an item's properties
        console.log(reqBody.name)
        if (reqBody.name) {
            item.name = reqBody.name
        }
        
        if (reqBody.price) {
            item.price = reqBody.price
        }
        
        return {"updated": item}
    }

    remove(itemToDelete: Item): object {
        // Remove an item from the list
        this.items = this.items.filter(item => item !== itemToDelete)
        
        return {"message": "Deleted"}
    }
}

module.exports = ItemList