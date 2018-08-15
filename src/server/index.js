const express = require('express')
const volleyball = require('volleyball')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()
module.exports = app

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use('/api', require('./api'))

app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not found')
        err.status = 404
        next(err)
    } else {
        next()
    }
})

// error handling endware
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
        console.log(`Mixing it up on port ${PORT}`)
    )
}

startListening()
