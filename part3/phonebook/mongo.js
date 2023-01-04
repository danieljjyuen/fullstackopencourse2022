const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://dan:${password}@cluster0.zjczrsu.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')
    })
    .catch((err) => console.log(err))

if(process.argv.length<3) {
    console.log('Please Provide Password as Argument: node mongo.js <password>')
    process.exit(1)
}else if(process.argv.length===5) {
    const person = new Person({
        name: name,
        number: number,
    })
        .save()
        .then(result => {
            console.log(`added ${result.name} ${result.number} to phonebook`)
            mongoose.connection.close()
        })
}else if(process.argv.length===3){
    Person.find({})
        .then(result => {
            console.log('phonebook : ')
            result.forEach(result => console.log(`${result.name} ${result.number}`))
            mongoose.connection.close()
        })
}






