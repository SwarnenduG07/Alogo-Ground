import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <main>
        <div className='flex justify-items-start mt-24 ml-36 flex-col text-neutral-200'>
            <h1 className='font-medium  font-serif text-6xl'>
                Algoprep is a purpose to <br /> be good in algo & Dsa
            </h1>
            <h1 className='pt-4 font-medium'>
               Meet the platform for modern Data Structure practice <br /> 
               qiality questions, contests, and resources.
            </h1>
            <div className='mt-3'>
                <Button className='bg-neutral-200 text-black hover:bg-slate-200 text-sm font-normal h-10 w-24'>
                    Start Building
                </Button>
            </div>
        </div>
    </main>
  )
}

export default Hero
