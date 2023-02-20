const express = require('express')
const router = express.Router()

const org = process.env.ORG

const { users } = require('../models/models')

router.get('/users', (req, res, next) => {
    users.find({ orgs: org})
})

module.exports = router