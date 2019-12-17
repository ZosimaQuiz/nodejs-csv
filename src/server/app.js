const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const csvRoute = require('./routes/csv')
const userRoute = require('./routes/user')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3939

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/users', userRoute)
app.use('/csv', csvRoute)

app.listen(port, () => {
  console.log(`App listening on ${port} port.`)
})