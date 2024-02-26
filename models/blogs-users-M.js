const mongoose = require('mongoose')
require('dotenv').config()
const uniqueValidator = require('mongoose-unique-validator')
mongoose.connect(process.env.MONGODB_URI).then(res =>  console.log('Connect to mongodb') )

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refer:"Blog"
        }
    ]

  })
  usersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // el passwordHash no debe mostrarse
      delete returnedObject.passwordHash
    }
  })
  usersSchema.plugin(uniqueValidator)

  module.exports = mongoose.model('Users', usersSchema)