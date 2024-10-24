"use client"
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
const LandingNavBar = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className='bg-transparent backdrop-blur-md lg:mx-32 md:mx-32 mx-12 py-1.5 mt-5 rounded-xl border border-s-transparent border-slate-700'>
      <nav className='flex justify-between items-center'>

        <div className='font-mono lg:ml-8 md:ml-8 ml-3 font-normal text-neutral-100'>
          _AlgoPlay
        </div>
        
        <div className='md:hidden mr-8'>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className='text-white hover:text-gray-300 focus:outline-none'
          >
            <Menu size={24} /> 
          </button>
        </div>

        <div className='hidden md:flex space-x-8 mr-5'>
          <a href='#' className='font-thin md:text-neutral-400 hover:text-gray-300'>Features</a>
          <a href='#' className='text-white hover:text-gray-300'>Pricing</a>
          <span className="space-x-3">
            <Button 
              className="h-7 text-sm font-semibold delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 transition duration-500 ease-in-out" 
              variant="outline"
              onClick={() => signIn()}
            >
              Login
            </Button>
            <Button 
              className="h-7 delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 transition duration-500 ease-in-out" 
              onClick={() => router.push("/signup")}
            >
              Signup
            </Button>
          </span>
        </div>

        {isMobileMenuOpen && (
          <div className='absolute top-16 right-8 bg-gray-800 w-48 py-2 rounded-lg shadow-lg md:hidden'>
            <a href='#' className='block px-4 py-2 text-white hover:bg-gray-700'>Features</a>
            <a href='#' className='block px-4 py-2 text-white hover:bg-gray-700'>Pricing</a>
            <div className='px-4 py-2 space-y-2'>
              <Button 
                className="w-full h-7 text-sm font-semibold delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 transition duration-500 ease-in-out" 
                variant="outline"
                onClick={() => signIn()}
              >
                Login
              </Button>
              <Button 
                className="w-full h-7 delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 transition duration-500 ease-in-out" 
                onClick={() => router.push("/signup")}
              >
                Signup
              </Button>
            </div>
          </div>
        )}

      </nav>
    </div>
  )
}

export default LandingNavBar
