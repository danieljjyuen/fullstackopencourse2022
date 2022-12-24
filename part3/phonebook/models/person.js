const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
.connect(url)
.then(result => console.log('connected'))
.catch(err => console.log(err))

const personSchema = mongoose.Schema({
  name:{
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minlength:8,
    required: true,
    validate: {
      validator: (value) => {
        const form1 = /^\d{8,}$/
        const form2 = /^\d{2}-{1}\d{6,}$/
        const form3 = /^\d{3}-{1}\d{5,}$/
        return form1.test(value)||form2.test(value)||form3.test(value)
      },
      message: 'Number format is wrong'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)