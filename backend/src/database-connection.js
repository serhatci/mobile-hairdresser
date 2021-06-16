const mongoose = require('mongoose')

// Disables depreciate warnings
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE
let connectionString = process.env.MONGODB_CONNECTION_STRING

if (!connectionString) {
  connectionString = `mongodb+srv://${username}:${password}@cluster0.knvjh.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`
}

mongoose.set('debug', false)

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection established'))
  .catch(console.log)
