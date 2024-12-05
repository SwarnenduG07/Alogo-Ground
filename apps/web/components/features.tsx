import { ArrowBigLeft, ArrowUpAz, ArrowUpLeftFromSquare, ArrowUpSquare } from 'lucide-react'
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
    <section
      className="mt-4 md:ml-14"
      id="features"
    >
      <div className="flex flex-col items-center m-auto text-center gap-4 max-w-[1024px]">
        <div className="lg:text-5xl md:text-5xl text-3xl font-bold">
           <span className='text-neutral-200'> Platform </span><span className="text-amber-300">Features</span>
        </div>
        <div className="text-sm text-gray-500 w-full md:w-2/3">
          Unlock the Full Potential of Competitive Programming with These Key
          Features
        </div>
        <div className="lg:grid md:grid grid gap-4 grid-cols-1 md:grid-cols-2 p-2 cursor-pointer">
          {Feature.map((lang: any, index: number) => (
            <div
              className={`border-[1px] rounded-md p-2 text-start gap-2 flex flex-col  ${
                index % 2 === 0 ? "mr-0" : "ml-0"
              }`}
              key={index}
            >
              <div className="flex gap-2 items-center">
                <div className='text-rose-400 font-semibold'>
                    <ArrowUpLeftFromSquare />
                </div>
                <div className="font-semibold text-neutral-400">{lang.title}</div>
              </div>
              <div className="text-gray-500">{lang.describe}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features