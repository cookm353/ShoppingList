class Item {
    name: string
    price: number

    constructor(name: string, price: number) {
        this.name = name
        this.price = price
    }
}

class ItemList {
    /* Class representing a shopping list */
    items: Array<Item> = []
    
    constructor() {
        const popsicle = new Item("popsicle", 1.45)
        const cheerios = new Item("Cheerios", 3.40)
        this.items.push(popsicle)
        this.items.push(cheerios)
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
        // console.log("Name: ", name)
        return this.items.find(item => item.name === name)
    }

    getAll(): Array<Item> {
        // Retrieve all items
        return this.items
    }

    update(item: Item, reqBody: object): object {
        // Update an item's properties
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