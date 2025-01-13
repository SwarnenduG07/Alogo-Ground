"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='backdrop-blur-md bg-black/10 border-b border-white/10 sticky top-0 z-50'>
       <nav className='container mx-auto flex justify-between items-center py-4'>
             <div className='font-mono font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300'>
               algo-play
            </div>
            <div className='space-x-6 font-medium'>
              <Link className="text-gray-200 hover:text-purple-400 transition-colors" href="/contests">Contest</Link>  
              <Link className="text-gray-200 hover:text-purple-400 transition-colors" href="/problems">Problem</Link>  
              <Link className="text-gray-200 hover:text-purple-400 transition-colors" href="/standings">Standings</Link>  
            </div> 
            <div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 transition-colors"
                onClick={() => signOut()}>
                  Logout
              </Button>
            </div>
       </nav>
    </div>
  )
}

export default Navbar
