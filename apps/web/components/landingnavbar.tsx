"use client"
import { signIn} from "next-auth/react"
import { Button } from "./ui/button"
import React from 'react'
import { useRouter } from "next/navigation"

const LandingNavBar = () => {
  const router = useRouter()
  return (
    <div className='bg-transparent backdrop-blur-md mx-32 py-1.5 mt-5 rounded-xl border border-s-transparent border-slate-700'>
      <nav className='flex justify-between items-center'>

        <div className='font-mono ml-8 font-normal text-neutral-100'>
          _AlgoPlay
        </div>
        
        <div className='hidden md:flex space-x-8 mr-5'>
          <a href='#' className='text-white hover:text-gray-300'>Features</a>
          <a href='#' className='text-white hover:text-gray-300'>Pricing</a>
          <span className="space-x-3">
            <Button className="h-7 text-sm font-semibold delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-purple-500  transition duration-500 ease-in-out" variant="outline"
            onClick={() => 
              signIn()
            }
            >
                Login
            </Button>
            <Button className="h-7 delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-purple-500  transition duration-500 ease-in-out" 
             onClick={() => 
              router.push("/signup")
            }
            >
                Signup
            </Button>
          </span>
        </div>
      </nav>
    </div>
  )
}

export default LandingNavBar
