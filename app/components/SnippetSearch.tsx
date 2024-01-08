'use client'
import { useState, useEffect, FormEventHandler, MutableRefObject } from 'react'
import TextField from '@mui/material/TextField'   
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import SnippetPreview from './SnippetPreview'
import { SnippetInterface } from '../models/snippet'
import RelatedSnippetPreview from './RelatedSnippetPreview'
import GetSnippet from '../lib/GetSnippet'

interface SnippetSearchProps{
    pageRef: MutableRefObject<any>
}

export default function SnippetSearch (props: SnippetSearchProps) {
    
    const [snippetObject, setSnippetObject] = useState<SnippetInterface>()
    const [relatedSnippet, setRelatedSnippet] = useState<Array<SnippetInterface>>()
    const [searchText, setSearchText] = useState<string>("")
    
    
    const handleSubmit = async (e : any) => {
        e?.preventDefault();

        try {
            setSnippetObject(undefined);
            const result = await GetSnippet(searchText);
            
            
            setSnippetObject(result.received.snippet);
            if (result.received.related)
                setRelatedSnippet(result.received.related);   
            
            
        } catch (error) {
            console.log(error);
        }
           
    }
    const handleRelatedClick = async (searchQuery: string) => {
        setSearchText(searchQuery);
        props.pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        try {
            setSnippetObject(undefined);
            const result = await GetSnippet(searchQuery);
            
            
            setSnippetObject(result.received.snippet);
            if (result.received.related)
                setRelatedSnippet(result.received.related);   
            
            
        } catch (error) {
            console.log(error);
        }
    }

    const RenderRelatedSnippets =(snippet : SnippetInterface) => {
        return(<RelatedSnippetPreview snippet={snippet} onClick={handleRelatedClick} />)
    }

    return (
    <div className='flex justify-center items-center flex-col w-full pt-10'>
        <form className='flex flex-row w-1/2' onSubmit={(e) => handleSubmit(e)}>
            <TextField 
            className='w-full'
            InputProps={{className: "rounded-r-none rounded-l-md font-sans w-full"}}
            id="outlined-basic" 
            variant='outlined' 
            value={searchText}    
            placeholder='Create a react functional component snippet'
            onChange={(e) => setSearchText(e.target.value)}/> 
            <IconButton className='text-sm gap-1 rounded-l-none rounded-r-md  font-sans bg-neutral-800 text-white' type='submit'> <SendIcon  /></IconButton>
        </form>
        <SnippetPreview className='mt-5' snippet={snippetObject} ></SnippetPreview>
        <div className='pt-10 flex justify-center flex-col items-center'>
            {
                relatedSnippet ? (
                    <>
                        <h1 className='text-xl pb-10 font-semibold'>Related Snippets</h1>
                        <div className='grid grid-cols-3 gap-4'>
                            {relatedSnippet.map(RenderRelatedSnippets)}
                        </div>
                    </>
                ) : null
            }
        </div>
    </div>
  )
}
