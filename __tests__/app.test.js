process.env.NODE_ENV = "test"

const app = require('../dist/app')
const ItemList = require("../dist/items")
const request = require('supertest')

let popsicle, cheerios
const itemList = new ItemList()

describe("Test routes", () => {
    beforeEach(function() {
        popsicle = itemList.items[0]
        cheerios = itemList.items[1]
    }) 
    
    afterEach(() => {
    })

    test("Get all items", async () => {
        const resp = await request(app).get('/items')

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual([popsicle, cheerios])
    })

    test("Get individual item", async () => {
        const resp = await request(app).get('/items/popsicle')

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(popsicle)
    })

    test("Get nonexistent item", async () => {
        const resp = await request(app).get("/items/Chocotaco")

        expect(resp.statusCode).toBe(400)
        expect(resp.body).toEqual(
            {"err": {msg: "Invalid item name", status: 400}
        })
    })

    test("Add item", async () => {
        const milk = {name: "milk", price: 3.49}
        const resp = await request(app).post('/items').send(milk)

        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({added: milk})
    })

    test("Update item's name", async () => {
        const resp = await request(app)
            .patch('/items/popsicle')
            .send({name: "Chocotaco"})

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            updated: {name: "Chocotaco", price: 1.45}
        })
    })

    test("Update item's price", async () => {
        const resp = await request(app).patch('/items/Cheerios').send({price: 3.99})

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({updated: {name: "Cheerios", price: 3.99}})
    })

    test("Update item's name and price", async () => {
        const resp = await request(app)
            .patch('/items/Cheerios')
            .send({name: "Kix", price: 3.49})

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            updated: {name: "Kix", price: 3.49}
        })
    })

    test("Delete item", async () => {
        const resp = await request(app).delete('/items/Cheerios')

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"message": "Deleted"})
    })
})