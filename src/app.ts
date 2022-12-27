const expressError = require('./expressError')
const express = require("express")
const fs = require('fs')
const process = require('process')
const itemRoutes = require('./itemRoutes')
const morgan = require("morgan")

const app = express()
const port: number = 3000

app.use(express.json())
app.use('/items', itemRoutes)
app.use(morgan("dev"))

// 404 handler for invalid URLs
app.use((req, resp, next) => {
    const err = new ExpressError("Page Not Found", 404)
    next(err)
})

// Global error handler
app.use((err, req, resp, next) => {
    const status = err.status || 500
    const msg = err.msg

    return resp.status(status).json({err: { msg, status }})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})