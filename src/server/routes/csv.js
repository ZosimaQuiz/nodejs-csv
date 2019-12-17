const express = require('express')
const fs = require('fs')
const User = require('../../mongodb/models/User')
const csvToJson = require('csvjson')

const pathToFile = __dirname + '/../temp/users.csv'
const router = express.Router()

router.post('/upload', (req, res) => {
    const file = req.files['']
    file.mv(pathToFile, async (err) => {
        if(err) {
            return res.status(500).send(err)
        }

        const data = fs.readFileSync(pathToFile, { encoding : 'utf8'})
        const options = { delimiter: ',', quote: '"' }
        const users = csvToJson.toObject(data, options)
        for(let i = 0; i < users.length; i++) {
          const user = new User(users[i])
          await user.save()
        }
        res.send('File uploaded!')
    })
})

router.get('/download', async (req, res) => {
  User.find({}, (err, users) => {
    let data = 'UserName, FirstName, LastName, Age\n'
    for(let i = 0; i < users.length; i++) {
      data += `${users[i].UserName}, ${users[i].FirstName}, ${users[i].LastName}, ${users[i].Age}\n`
    }
    const file = fs.writeFileSync(pathToFile, data)
    res.download(pathToFile)
  })
})

module.exports = router