import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import urlroutes from './src/routes/url.routes.js'
import rateLimit from 'express-rate-limit';
import cors from "cors"

const app= express();
app.use(express.json());
dotenv.config();
app.use(cors());

const limitter=rateLimit({
     windowMs:5*60*1000,
     limit:100,
     message:"your rate-limiting is reached please try later after 5 minutes"
});
const port=process.env.port || 3000;

// app.use(limitter);
app.use("/",urlroutes);
const func=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI,{maxPoolSize:100});
        console.log("connected to DB");
    }catch(err){
        console.log(err);
    }
}
app.listen(port,async()=>{
       console.log(`app listening on port ${port}`);
       func();      
});
