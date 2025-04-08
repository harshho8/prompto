import Prompt from "@models/prompts";
import { connectToDB } from "@utils/database";

export const GET=async(req,{params})=>{
  try{
    await connectToDB()

    const prompt=await Prompt.findById(params.id).populate('creator')

    if(!prompt) return new Response("prmpot not found",{status:404})

    return new Response(JSON.stringify(prompt),{
        status:200
    })
  }
  catch(err){
    return new Response("failed to fetch all prompts",{status:500});
  }
}

export const PATCH=async (req,{params})=>{
   const {prompt,tag}=await req.json();


   try{
    await connectToDB();

    const existingPrompt=await Prompt.findById(params.id);

    if(!existingPrompt) return new Response ("Prompt not fount",{staus:404});
    
    existingPrompt.prompt=prompt;
    existingPrompt.tag=tag;

    await existingPrompt.save();

    return new Response(JSON.stringify
        (existingPrompt),{status:200} )
   }
   catch (err){
    return new Response("failed to update the prompt");
   }
}

export const DELETE=async(req,{params})=>{
    try{
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);

        return new Response("prompt deleted successfully",{status:200});
    }
    catch (err){
        return new Response("failed to delete the prompt");
    }
}
