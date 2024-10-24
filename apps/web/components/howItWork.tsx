import { IconUserQuestion } from '@tabler/icons-react'
import { div } from 'framer-motion/client'
import { ArrowBigLeft, ArrowUpAz, ArrowUpLeftFromSquare, ArrowUpSquare, FileQuestion } from 'lucide-react'
import { describe } from 'node:test'
import { title } from 'process'
import React from 'react'

const Feature = [
   {
    step: "Step 1",
    title: "Sign Up or Log in",
    describe: "Create your account by signing up with your email, Google, or GitHub. If you are already a member, simply log in to access your profile and start coding right away"
   },
   {
    step: "Step 2",
    title: "Chooose a Contest or Problem",
    describe: "Explore our regularly scheduled coding contests and select one that fits your skill level or interests. Alternatively, dive into our extensive problem library to tackle challenges at your own pace."
   },
   {
    step: "Step 3",
    title: "Start Coding",
    describe: "Use our interactive coding environment to write, test, and submit your solutions directly on the platform. Receive instant feedback to refine your approach."
   },
   {
    step: "Step 4",
    title: "Track Your Progress",
    describe: "Monitor your ranking on real-time leaderboards and analyze your performance with detailed analytics. This insight helps you understand your strengths and pinpoint areas for improvement."
   },
]

const HowItWorks = () => {
  return (
    <section
      className="mt-4 md:ml-14"
      id="features"
    >
      <div className="flex flex-col items-center m-auto text-center gap-4 max-w-[1024px]">
        <div className="lg:text-5xl md:text-5xl text-3xl font-bold flex  ">
           <span className='text-neutral-200 mr-3'> How it</span> <br />
           <span className="text-amber-300 mr-3"> Works </span> 
           <span className='text-fuchsia-600 flex flex-col text-3xl justify-center '><IconUserQuestion/></span>
        </div>
        <div className="text-sm text-gray-500 w-full md:w-2/3">
          Unlock the Full Potential of Competitive Programming with These Key
          Features
        </div>
        <div className="lg:grid md:grid grid gap-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-2 p-2 ">
          {Feature.map((lang: any, index: number) => (
            <div
              className={`border-[1px] rounded-md p-2 text-start gap-2 flex flex-col  ${
                index % 2 === 0 ? "mr-0" : "ml-0"
              }`}
              key={index}
            >
              <div className="flex gap-2 items-center">
                <div className='flex border-[1px] p-1.5 rounded-full bg-sky-500/75 w-20 h-8 text-sm  justify-center font-semibold border-black'>
                    {lang.step}
                </div>
                <div className="font-semibold text-neutral-400">{lang.title}</div>
              </div>
              <div className="text-gray-500" >{lang.describe}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks