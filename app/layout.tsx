import type { Metadata } from 'next'
import { Nunito_Sans, Roboto_Mono } from 'next/font/google'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

const Nunito = Nunito_Sans({ subsets: ['latin'] })
const roboto = Roboto_Mono({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Snipper',
  description: 'An easier way to generate snippets that are tailermade for your enviroment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${Nunito.className} overflow-hidden h-screen`}  >
        <section className='w-full h-20 flex flex-row gap-5 justify-between items-center px-[15%]'>
          <nav className='flex flex-row gap-6 justify-center'>
            <a href="/">Home</a>
            <a href="/">Beta information</a>
            <a href="/">Pricing</a>
            <a href="/">About</a>
          </nav>
          <div className=''>
            <a href="/">
              login
            </a>
          </div>
        </section>

        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        
      </body>
    </html>
  )
}
