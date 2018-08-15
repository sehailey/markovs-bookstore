const router = require('express').Router()
const fs = require('fs')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const data = fs.readFileSync('../parser/CFD.json')
        console.log(data)

        res.json(data)
    } catch (err) {
        next(err)
    }
})
