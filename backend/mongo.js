const mongoose = require('mongoose')

if(process.argv.length < 4) {
    console.log('give username and/or as an arguement')
    process.exit(1)
}

const username = process.argv[2]
const password = process.argv[3]

const url = `mongodb+srv://${username}:${password}@cluster0.nnfppmg.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 4){
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

if(process.argv.length === 6){
    const name = process.argv[4]
    const number = process.argv[5]
    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}