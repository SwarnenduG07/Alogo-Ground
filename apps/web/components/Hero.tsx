import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <main className=''>
        <div className='flex justify-items-start lg:mt-24 md:mt-24 mt-20 lg:ml-36 md:ml-32 ml-12 flex-col text-neutral-200'>
            <h1 className='font-medium font-serif lg:text-5xl md:text-5xl text-4xl'>
                Algoprep is a purpose to <br /> be good in algo & Dsa
            </h1>
            <h1 className='pt-5 font-medium'>
               Meet the platform for modern Data Structure practice <br /> 
               qiality questions, contests, and resources.
            </h1>
            <div className='mt-4 space-x-8'>
                <Button className='bg-neutral-200 text-black  text-sm font-normal h-9 delay-160  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400  transition duration-200 ease-in-out rounded-xl'>
                    Start Building
                </Button>
                <Link href={"#features"}
                className=' border-[1px] p-[8px] rounded-xl ext-sm '
                >
                    Explore features
                </Link>
            </div>
        </div>
    </main>
  )
}

export default Hero
