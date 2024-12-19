import React from 'react'
import { getExixtingContests, getRunningContests, getUpcomingContests } from '@/src/app/db/contest'
import { ContestCard } from './contest-card';

export default async function contests()  {

    const [upcomingContests, pastContests, runningContests] = await Promise.all([
        getUpcomingContests(),
        getExixtingContests(),
        getRunningContests(),
    ]);
  return (
    <div>
        <div className='pt-5 ml-4'>
            <h1 className='font-bold text-2xl'>
               Ongoing Contests
            </h1>
            <h1 className='text-slate-400'>
                Check out ongoing contests on alog-play
            </h1>
            <div>
                {/* contestcard */}
                {runningContests.map((contest: any) => (
                    <ContestCard 
                    key={contest.id}
                    title={contest.title} 
                    id={contest.id} 
                    endTime={contest.endTime} 
                    startTime={contest.startTime}                    />
                ))}
                
            </div>

            <div className='my-16'>
                <h1 className='font-bold text-2xl'>
                upcoming Contests
                </h1>
                <h1 className='text-slate-400'>
                    Check out upcoming contests on alog-play
                </h1>
                <div>
                    {/* contestcard */}
                    {upcomingContests.map((contest: any) => (
                        <ContestCard 
                        key={contest.id}
                        title={contest.title}
                        id={contest.id}
                        startTime={contest.startTime}
                        endTime={contest.endTime}
                        />
                    ))}

                </div>
          </div>
          <div className='my-16'>
                <h1 className='font-bold text-2xl'>
                Past Contests
                </h1>
                <h1 className='text-slate-400'>
                    Check out past contests on alog-play
                </h1>
                <div>
                    {/* contestcard */}
                    {pastContests.map((contest: any) => (
                        <ContestCard 
                        key={contest.id}
                        title={contest.title}
                        id={contest.id}
                        startTime={contest.startTime}
                        endTime={contest.endTime}
                        />
                    ))}
                </div>
          </div>
        </div>
    </div>
  )
}
