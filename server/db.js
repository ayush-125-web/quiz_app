import 'dotenv/config'
import mongoose from "mongoose";


const connect_To_DB=async()=>{

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to Database')
    }
    catch(err){
        console.log(`Database cannot be connected : ${err.message}`)
        process.exit(1);
    }
}

export {connect_To_DB}