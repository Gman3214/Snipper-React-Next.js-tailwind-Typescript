import jwt from 'jsonwebtoken';
import { Snippet, SnippetInterface } from '@/app/models/snippet';
import dbConnect from '@/app/lib/dbConnect';
import OpenAI from 'openai'
import { NextRequest } from 'next/server'
import { setTimeout } from 'timers/promises';
import { AuthCheck } from '@/app/api/middleware'

const MAX_TRIES = 20;
const openai = new OpenAI({apiKey:""});



async function CreateNewSnippet(query: string, tokenData: jwt.JwtPayload) {


    const run = await openai.beta.threads.createAndRun({
        assistant_id: "asst_vocKmdkZuf94FFS9M0TUWMq5",
        thread:{
            messages: [
                {role: "user", content: query}
            ]
        }
    })
    
    let messages : any;
    
    for (let i = 0; i < MAX_TRIES ; i++){
        
        const updatedRun = await openai.beta.threads.runs.retrieve(run.thread_id, run.id)

        if (updatedRun.status === "completed"){
            
            messages = await openai.beta.threads.messages.list(run.thread_id);

            const answer : string = messages.data[0].content[0].text.value as string
            
            if (answer === "Invalid, I can't do that")
                throw "Invalid query please request a snippet :D"

            const doesExist = await Snippet.findOne({snippet: answer});
            const snippetName = answer.split("\"")[1];

            if (!doesExist){
                const result = await Snippet.create({
                    query: query,
                    name: snippetName,
                    snippet: answer,
                    generatedby: tokenData.username 
                })
                return result
            }

            return doesExist;
            
        }
        await setTimeout(1000, 'result');
    }
    
    throw "Request timed out."

}

export async function GET(request: Request, { params }: { params: { query: string } }) {
    try {
        
        await dbConnect()
    
        const tokenData : jwt.JwtPayload  = await AuthCheck(request)
        
        
        
        const mainSearch = await Snippet.findOne({"query": params.query});
        
        let relatedToSearch = {};
        
        if (mainSearch){
            relatedToSearch = await Snippet.find({"$text": {"$search": params.query }, _id: {"$ne": mainSearch._id }}).limit(9)
            return Response.json({status: 'success', received: {snippet: mainSearch, related: relatedToSearch}})
        }else
            relatedToSearch = await Snippet.find({"$text": {"$search": params.query }}).limit(9)
        
        let aiGenerated : SnippetInterface = {
            name:"Has to be Premium",
            snippet: "",
            generatedby:"admin",
            likes: 0,
            query: params.query
        };

        if (tokenData)
            aiGenerated = await CreateNewSnippet(params.query, tokenData);
        
        
        return Response.json({status: 'success', received: {snippet: aiGenerated, related: relatedToSearch}})
    
    } catch (error) {
        return Response.json({status: 'failed', received: error})
    }
}

