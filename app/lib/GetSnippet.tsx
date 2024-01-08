import { SnippetInterface } from "../models/snippet"

interface GetSnippetInterface {
    status: string,
    recevied: {
        snippet?: SnippetInterface
        related?: Array<SnippetInterface> 
    }

}

export default async function GetSnippet(query: string) {
    try {
        const encodedQuery = encodeURI(query);
        const response = await fetch(`/api/snippet/${encodedQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbSIsImxvZ2luVGltZSI6MTcwNDM3ODQ0NTY4MSwiaWF0IjoxNzA0Mzc4NDQ1fQ.ECE-PSE46mCXjuUo85TwJMrwTVSONIFfHKnM56NeGLc"
            },
        });
        
        const result = await response.json();
        
        if (result.status === "success"){
            return result;
        }    
        console.log(result.received);
        
    } catch (error) {
        console.log(error);
    }
       
}
