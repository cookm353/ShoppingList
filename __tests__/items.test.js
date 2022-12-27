const ItemList = require("../dist/items")

describe("Test item list class", () => {
    let itemList

    beforeEach(() => {
        itemList = new ItemList()
    })

    test("Test getting all items", () => {
        const items = itemList.getAll()

        expect(itemList.getAll()).toContainEqual(
                {"name": "popsicle", "price": 1.45}
            )
    })

    test("Test getting item with valid name", () => {
        const item = itemList.get("Cheerios")
        expect(item).toEqual({
            "name": "Cheerios", "price": 3.4
        })
    })

    test("Test getting item with invalid name", () => {
        const item = itemList.get("bananas")
        expect(item).toBeUndefined()
    })

    test("Test adding item to list", () => {
        const newItem = itemList.add("bananas", 2.45)

        expect(itemList.get("bananas")).toBeDefined()
        expect(itemList.get("bananas")).toEqual({
            "name": "bananas", "price": 2.45
        })
        expect(newItem).toEqual({
            "name": "bananas",
            "price": 2.45
        })
    })

    test("Test updating an item's name only", () => {
        const item = itemList.get("Cheerios")
        const newName = {"name": "Cheerio's"}
        itemList.update(item, newName)

        expect(itemList.get("Cheerio's")).toBeDefined()
    })

    test("Test updating an item's price only", () => {
        const item = itemList.get("Cheerios")
        const newPrice = {"price": 5}
        itemList.update(item, newPrice)

        expect(itemList.get("Cheerios").price).toEqual(5)
    })

    test("Test updating name and price", () => {
        const item = itemList.get("Cheerios")
        const newDetails = {
            "name": "Froot Loops",
            "price": 3.99
        }

        const msg = itemList.update(item, newDetails)

        expect(itemList.get("Froot Loops")).toBeDefined()
        expect(itemList.get("Froot Loops").price).toEqual(3.99)
        expect(itemList.get("Cheerios")).toBeUndefined()
        expect(msg).toEqual({"updated": newDetails})
    })

    test("Test deleting item", () => {
        const item = itemList.get("Cheerios")
        const msg = itemList.remove(item)

        expect(itemList.get("Cheerios")).toBeUndefined()
        expect(msg).toEqual({"message": "Deleted"})
    })
})