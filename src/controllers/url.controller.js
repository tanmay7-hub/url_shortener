import shortCodegenerator from '../utils/codeGenerator.js';
import  Url from '../models/urlModel.js';
import  client from '../config/redis.js'
import encode from '../utils/base64.js';
import urlQueue from '../queue/urlQueue.js';
export const createShortUrl = async(req,res)=>{
       try{
             const {OriginalUrl,customAlias} = req.body;

             const check= await Url.findOne({OriginalUrl});
             if(check){
                return res.status(200).json({ shortCode:check.shortCode});
             }
             //case1
             let shortCode;
             if(customAlias){
                 const isAliasUnique = await Url.findOne({shortCode:customAlias});
                 if(isAliasUnique !== null){
                         return res.status(400).json("custom alias provided is not unique.Try anathor alias or just leave it empty we'll handle it by ourself. ");
                 }
                shortCode= customAlias;
             }
             else{
                console.log("case 2 hitted");
                 const newUrl = new Url({
                      OriginalUrl
                 });
                 await newUrl.save();

                shortCode= encode(parseInt(newUrl._id.toString().slice(-6)),16);
                newUrl.shortCode=shortCode;
                await client.set(shortCode,OriginalUrl,"EX",3600);
                await newUrl.save();
                return res.status(200).json({shortCode:`${process.env.BACKEND_URL}/${newUrl.shortCode}`});
             }
             
             const newUrl= await Url.create({
                  shortCode,
                  OriginalUrl
             });
              await client.set(shortCode,OriginalUrl,"EX",3600);
              return res.status(200).json({shortCode:`${process.env.BACKEND_URL}/${newUrl.shortCode}`});
       }catch(err){
           console.log(err.message);
           res.status(500).json({message:"error at creating short url in controller",errMsg:err});
       }     
};
export const redirectUrl = async(req,res)=>{
    try{
         
        console.log(`req received in port ${process.env.PORT}`); 
        const { shortenCode } = req.params;
        const cached = await client.get(shortenCode);
        if(cached){
           await urlQueue.add("increment click",{shortenCode});
           console.log("given cached response");
           return res.redirect(cached);
        }

        const url = await Url.findOne({shortCode:shortenCode});
        if(!url){
            return res.json({message:"Giving incorrect URl"});
        }
        await client.set(shortenCode,url.OriginalUrl,"EX",3600);
        console.log("fetched from db successfull");

        
        await urlQueue.add("increment click",{shortenCode},{
             attempts:5,
             backoff:{
                 type:"exponential",
                 delay:1000
             },
        });   
        res.status(200).redirect(url.OriginalUrl);
    }catch(err){
        console.log(err);
        res.status(500).json("error at redirecting logic");
    }
};
export const home = async(req,res)=>{
    try{
         res.send(`listening on port ${process.env.PORT}`);
    }catch(err){
        return res.status(500).json("get is not working check code");
    }
}
