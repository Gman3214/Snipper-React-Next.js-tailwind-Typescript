'use client'
import { useState, useEffect } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { SnippetInterface } from '../models/snippet';


interface ActionButtonsProps{
  snippet: SnippetInterface,

}

export default function SnippetActionButtons (props: ActionButtonsProps) {
  
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false)
  
  const handleLike = () => {
    // Your code here
  }

  const handleBookMarked = () => {
    // Your code here
  }

  const handleCopy = () => {
    const onlyCode = props.snippet.snippet.replace("\`\`\`json", "").replace("\`\`\`", "")
    navigator.clipboard.writeText(onlyCode)
  }
  
  return (
    <div className='flex flex-row justify-end'>
      <IconButton onClick={handleLike}> {liked ? <FavoriteIcon className='text-white' /> : <FavoriteBorderOutlinedIcon className='text-white' />} </IconButton>
      <IconButton onClick={handleBookMarked}>{bookmarked ? <BookmarkIcon className='text-white' /> : <BookmarkBorderOutlinedIcon className='text-white' /> }</IconButton>
      <IconButton onClick={handleCopy}><ContentCopyIcon className='text-white' /></IconButton>
    </div>
  )
}

