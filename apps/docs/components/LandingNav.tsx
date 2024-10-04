import { Button } from '@repo/ui/button'
import React from 'react'

const NavBar = () => {
  return (
    <div className='bg-transparent backdrop-blur-md mx-32 py-3 mt-5 rounded-2xl border border-s-transparent border-slate-700'>
      <nav className='flex justify-between items-center'>

        <div className='font-mono ml-8 font-normal text-neutral-100'>
          _AlgoPrep
        </div>
        
        <div className='hidden md:flex space-x-8 mr-5'>
          <a href='#' className='text-white hover:text-gray-300'>Features</a>
          <a href='#' className='text-white hover:text-gray-300'>Pricing</a>
          <div>
              
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
