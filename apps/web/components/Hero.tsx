import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <main>
        <div className='flex justify-items-start mt-24 ml-36 flex-col text-neutral-200'>
            <h1 className='font-medium  font-serif text-5xl'>
                Algoprep is a purpose to <br /> be good in algo & Dsa
            </h1>
            <h1 className='pt-5 font-medium'>
               Meet the platform for modern Data Structure practice <br /> 
               qiality questions, contests, and resources.
            </h1>
            <div className='mt-4'>
                <Button className='bg-neutral-200 text-black  text-sm font-normal h-9 delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400  transition duration-500 ease-in-out rounded-xl'>
                    Start Building
                </Button>
            </div>
        </div>
    </main>
  )
}

export default Hero
