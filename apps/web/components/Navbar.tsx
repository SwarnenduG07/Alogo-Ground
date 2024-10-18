import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='border-b border-purple-400 py-3 bg-transparent backdrop-blur-md'>
       <nav className=' flex justify-between items-center'>
             <div className='font-mono font-bold text-2xl ml-5'>
               algo-play
            </div>
            <div className=' space-x-4 font-semibold cursor-pointer'>
              <a href="/contest">Contest</a>  
              <a href="/problems">Problem</a>  
              <a href="/standings">Standings</a>  
            </div> 
            <div className='mr-2'>
              <Button>
                  Logout
              </Button>
            </div>
       </nav>
    </div>
  )
}

export default Navbar
