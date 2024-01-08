'use client'
import SnippetSearch from './components/SnippetSearch'
import {useRef} from 'react';

export default function Home() {
  const pageRef = useRef(null)
  return (
    <main ref={pageRef} className="flex flex-col items-center h-[90%] flex-grow overflow-auto pb-10">
      <h1 className='text-8xl p-10 '>Snipper</h1>
      <SnippetSearch pageRef={pageRef} />
    </main>
  )
}
