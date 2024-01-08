'use client'

import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {materialDarkPlus} from '@/app/styles/materialDarkPlus'

interface CodeBlockProps {
    value: string,
    language?: string
}



export default function CodeBlock(props : CodeBlockProps) {
  return (
    <Markdown 
    components={{
      code({ node, inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '');

        return !inline && match ? (
          <SyntaxHighlighter style={materialDarkPlus} PreTag="div" language={match[1]} {...props}>
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}>
      {props.value}
    </Markdown>
  );
};
