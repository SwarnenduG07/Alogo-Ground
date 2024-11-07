"use client"
import { parseClock } from '@/lib/time';
import  { useEffect, useState } from 'react'

const ContestClock = ({endTime}: {endTime: Date}) => {
  const [currentTimeleft ,  setCurrentTimeleft] = useState(endTime.getTime() - Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeleft((currentTimeLeft) =>
        Math.max(0, currentTimeLeft - 1000),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main className='flex-1 md:py-8 rounded-lg shadow-md md:px-6'>
        <div className='flex items-center justify-center text-gray-500 dark:text-neutral-100'>
              {currentTimeleft > 0 ? (
                <div>{parseClock(currentTimeleft / 1000)}</div>
              ): null}
        </div>
    </main>
  )
}

export default ContestClock
