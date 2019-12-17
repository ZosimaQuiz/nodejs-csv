const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Age: {
      type: Number,
      required: true,
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User