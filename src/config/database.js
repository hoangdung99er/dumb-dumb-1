const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0vger.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
const connectDatabase = () => {
  mongoose.connect(uri).then(data => {console.log(`Mongodb connected with instance at: ${data.connection.host}`)})
}

module.exports = connectDatabase;