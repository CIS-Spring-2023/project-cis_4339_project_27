const express = require('express')
const router = express.Router()

const org = process.env.ORG

const { users } = require('../models/models')

router.post('/', async (req, res, next) => {
    const {username, password} = req.body

    if(!(username && password)){
        return res.status(400).json({error: "Username and password are required"});
    }

    try{
        let user = await users.findOne({ username });
        if (!user) {
            return res.status(400).json({error: "Invalid login"});
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        return next(err);
    }
   
})

module.exports = router