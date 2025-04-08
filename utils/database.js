import mongoose from 'mongoose';

let isconnected=false;

export const connectToDB =async ()=>{
    mongoose.set('strictQuery',true);

    if(isconnected){
        console.log("mongodb is already connected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"prompto",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        isconnected=true;
        console.log("mongodb connected successfylly");
    }
    catch (err){
       console.log(err);
    }
}