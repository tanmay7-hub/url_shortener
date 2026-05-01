import {Worker} from 'bullmq';
import connection from './connection.js'
import Url from '../models/urlModel.js';
import  mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({
    path:"../../.env"
});


await mongoose.connect(process.env.DB_URI);
    
const worker= new Worker("url-queue",async(job)=>{
                
    const shortCode= job.data.shortenCode;
    console.log(shortCode);
    const url =await Url.findOne({shortCode});
     if(url){
          url.clicks++;
          await url.save();
          console.log("Click updated:", shortCode);
     }
},{connection});

worker.on("completed",(job)=>{
     console.log("job done with id :",job.id);
});
worker.on("failed",(job,err)=>{ 

     console.log("job  failed with id :",job.id);
      console.log("Job ID:", job.id);
     console.log("Attempts:", job.attemptsMade);
     console.log("Error:", err.message);

});