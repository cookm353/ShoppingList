const app = require("./app")

const port: number = 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})