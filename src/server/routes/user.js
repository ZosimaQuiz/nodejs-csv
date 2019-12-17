const express = require('express')
const User = require('../../mongodb/models/User')

const router = express.Router()

router.get('/get', async (req, res) => {
  User.find({}, (err, users) => {
    res.send(users)
  })
})

module.exports = router