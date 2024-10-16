const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URI

// mongoose.connect('mongodb://127.0.0.1/mongopractice')

const Connection = async ()=>{
    // const URL = `mongodb+srv://AnuragYadav:nvUFkq2lyWWj7uy0@cluster0.ewdpijo.mongodb.net/MernCrud`

    try{
        // Connect to MongoDB
      await mongoose.connect(uri)

    // Log successful connection
      console.log('Database Connected!');
    }
    catch(err){
        // Log connection errors
        console.log("Error while connecting with database " ,err)
    }
}

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  image: String
})

const userModel =  mongoose.model('user', userSchema);
module.exports = {userModel, Connection}

