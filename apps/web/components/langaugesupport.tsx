import React from 'react'
import Image from 'next/image';

const langauges = [
   'C.svg','C++.svg','Csharp.svg','rust.png','Go.svg','Java.svg','JS.svg','Ruby.svg'
]

const Langaugesupport = () => {
  return (
    <section className='lg:ml-34 md:ml-32  my-24'>
         <div className="flex flex-col items-center text-center gap-4">
         <div className="lg:text-5xl md:text-5xl text-3xl text-neutral-300 font-bold">Supported <span className="text-amber-300">Languages</span></div>
         <div className="text-sm text-gray-500 w-full md:w-1/3">Solve problems in your preferred language with Algo Prep, offering a wide range of programming language options.</div>
         <div className="flex flex-wrap justify-center lg:space-x-4 md:space-x-4 space-x-2 cursor-pointer dark:bg-black rounded-md pt-2">
            {langauges.map((lang:string,index:number)=><Image key={index} src={`/languagesIcon/${lang}`} alt="lng icons" height={11} width={40} className='w-10 h-11'/>)}
         </div>
         <div className='text-zinc-500'>& Many More</div>
      </div>
    </section>
  )
}

export default Langaugesupport