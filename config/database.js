const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Access to env variable (process.env.variable)
dotenv.config({path : './config/config.env'});


const MONGO_URL =  process.env.MONGO_DB_URL;

const connectDb = async ()=>{
    try {
       // mongoose.set('strictQuery',false)
        const conn = await mongoose.connect(MONGO_URL);
        console.log(`connection to : ${conn.connection.host}`)

    } catch (error) {

        console.log(`connection to : ${error}`)
    }
   
}
module.exports = connectDb;