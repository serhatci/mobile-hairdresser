/* eslint-disable no-console */
const mongoose = require('mongoose')
const initializeDatabase = require('./database-initialization')

// Disables depreciate warnings
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE
let connectionString = process.env.MONGODB_CONNECTION_STRING

if (!connectionString) {
  connectionString = `mongodb+srv://${username}:${password}@cluster0.vnprm.mongodb.net/${dbName}?retryWrites=true&w=majority`
}

mongoose.set('debug', false)

const clientP = mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(m => m.connection.getClient())
  .catch(console.log)

clientP
  .then(() => console.log('connection established'))
  .then(() => {
    initializeDatabase(mongoose.connection)
    console.log('db initialized')
  })
  .catch(console.log)

module.exports = clientP
