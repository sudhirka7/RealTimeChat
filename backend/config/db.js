import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


const URL = process.env.MONGODB_URL

async function main() {
 await mongoose.connect(URL);
}

const connectDb =  ()=> {
  main().then(()=>{
    console.log("Connected successfully");
  }).catch(e=>{
    console.log("Error: ",e)
  })  
}

export default connectDb;