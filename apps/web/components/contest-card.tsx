
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { parseFutureDate, parseOldDate } from '@/lib/time';
import Link from 'next/link';

interface Contestcaedparams {
    title: string,
    id: string,
    endTime: Date,
    startTime: Date,
}

export function ContestCard  ({ title, id, endTime, startTime}: Contestcaedparams)  {

    const duraction = `${(new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60)} hours`;
    const isActive = startTime.getTime() < Date.now() && endTime.getTime() > Date.now();
  return (
    <Card className='mr-[700px]'>
        <CardHeader>
          <div className='flex justify-between mr-7'>
            <CardTitle>{title}</CardTitle>
          <div>
          {startTime.getTime() < Date.now() && endTime.getTime() < Date.now() ? (
            <div className='text-red-500'>Ended</div>
          ): null}
          {isActive ? <div className='text-green-500'>Active</div>: null}
          {endTime.getTime() < Date.now()  ? (
            <div className='text-red-500'>Ended</div>
          ): null}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flwx items-center justify-between'>
              <div>
                <p className='text-gray-500'>
                  {startTime.getTime() < Date.now() ? "Started" : "Starts In"}
                </p>
                <p>
                  {startTime.getTime() < Date.now() ? parseOldDate(new Date(startTime)) : parseFutureDate(new Date(startTime))}
                </p>
              </div>
              <div>
                <p className='text-gray-500'>
                  Duraction
                </p>
                <p>{duraction}</p>
              </div>
          </div>
          <CardFooter>
            <Link href={`/contest/${id}`}
            prefetch={false}
            >
              <Button >
                  {isActive ? "Participate" : "View Contest"}
              </Button> 
            </Link>
          </CardFooter>
        </CardContent>
    </Card>
  )
}

