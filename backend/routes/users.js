const express = require('express')
const router = express.Router()

const org = process.env.ORG

const { users } = require('../models/models')

router.post('/', (req, res, next) => {
    const {username, password} = req.body

    users.findOne({ username: username, password: password}, (error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
        }
        
    })
})

module.exports = router