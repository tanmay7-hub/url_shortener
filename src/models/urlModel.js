import mongoose from 'mongoose';
const urlSchema= new mongoose.Schema({
      shortCode:{
          type:String,
          unique:true
      },
      OriginalUrl:{
         type:String,
         required:true
      },
      clicks:{
        type:Number,
        default:0
      },
},{timestamps:true});
const Url=mongoose.model("Url",urlSchema);
export default Url;