"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='border-b border-purple-400 py-3 bg-transparent backdrop-blur-md'>
       <nav className=' flex justify-between items-center'>
             <div className='font-mono font-bold text-2xl ml-5'>
               algo-play
            </div>
            <div className=' space-x-4 font-semibold cursor-pointer'>
              <Link href="/contests">Contest</Link>  
              <Link href="/problems">Problem</Link>  
              <Link href="/standings">Standings</Link>  
            </div> 
            <div className='mr-2'>
              <Button onClick={() => 
                signOut()
                
              }>
                  Logout
              </Button>
            </div>
       </nav>
    </div>
  )
}

export default Navbar
