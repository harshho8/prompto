import Prompt from "@models/prompts";
import { connectToDB } from "@utils/database";

export const GET=async(req)=>{
  try{
    await connectToDB();

    const prompts=await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts),{
        status:200
    })
  }
  catch(err){
    return new Response("failed to fetch all prompts",{status:500});
  }
}
