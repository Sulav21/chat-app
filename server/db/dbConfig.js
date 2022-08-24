import mongoose from "mongoose";

export const dbConnection=()=>{
    try{
        const dbConn = mongoose.connect(process.env.MONGO_URL)
         dbConn && console.log('MongoDB is connected')
    }catch(error){
        console.log(error.message)
    }
}