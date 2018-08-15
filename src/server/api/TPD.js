const router = require('express').Router()
const fs = require('fs')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const { data } = await fs.readFile('../parser/TPD.json')
        res.json(data)
    } catch (err) {
        next(err)
    }
})
