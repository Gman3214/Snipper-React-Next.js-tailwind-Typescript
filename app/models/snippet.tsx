import mongoose from "mongoose";

const snippetScheme = new mongoose.Schema(
    {
        query: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: true,
        },
        snippet: {
            type: String,
            require: true
        },
        generatedby:{
            type: String,
            require: true,
            immutable: true
        },
        bundleids: {
            type: [String]
        },
        likes: {
            type: Number,
            default: 0
        }

    }
)

snippetScheme.index({query: 'text'});

export const Snippet = mongoose.models.Snippet || mongoose.model("Snippet", snippetScheme)


export interface SnippetInterface {
    query: string,
    name: string,
    snippet: string,
    generatedby: string
    bundleids?: [string]
    likes: number
}


export const defaultValue = {
    name:"none found to create please login",
    snippet: "",
    generatedby:"",
    likes: 0,
    query: ""
}
