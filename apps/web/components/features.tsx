import { describe } from 'node:test'
import { title } from 'process'
import React from 'react'

const Feature = [
   {
    title: "Competitive Coding Contest",
    describe: "Participate in challenging coding contests regularly, testing your skills against the best. Improve your problem-solving abilities and climb the leaderboards with each competition"
   },
   {
    title: "Vast Problem Library",
    describe: "Access a diverse collection of coding problems across various topics and difficulty levels. Challenge yourself with beginner to expert-level tasks and enhance your coding skills."
   },
   {
    title: "Seamless Coding",
    describe: "Code directly on the platform with our interactive coding environment. Write, test, and submit your solutions seamlessly without needing any external tools."
   },
   {
    title: "Real-Time Leaderboards",
    describe: "Track your progress with dynamic leaderboards that update in real-time. See where you stand in the global coding community and strive to improve your rank"
   },
   {
    title: "Detailed Problem Descriptions",
    describe: "Each problem comes with clear and comprehensive descriptions, including input/output examples. Understand the task at hand and approach each problem with confidence."
   },
   {
    title: "Multilingual Support",
    describe: "articipate in challenging coding contests regularly, testing your skills against the best. Improve your problem-solving abilities and climb the leaderboards with each competition"
   },
]

const Features = () => {
  return (
    <section className='flex flex-col items-center text-amber-400 mt-5'>
        <div className='space-x-3 lg:text-5xl  md:text-5xl text-3xl font-bold'>
            <span className='text-neutral-200'>Surported</span>
            <span className='text-amber-300'>Fetures</span>
        </div>
            <div className='lg:max-w-72 md:max-w-72 max-w-60 text-gray-500 text-sm mt-4'>
                Unlock your ultimate Potential of Data <br /> Structure & Algorythems with Algo Prep 
            </div>
    </section>
  )
}

export default Features