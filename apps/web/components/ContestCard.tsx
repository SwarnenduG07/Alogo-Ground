"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { start } from 'repl';
import { Button } from './ui/button';

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
    <Card>
        <CardHeader>
          <div className='flex justify-between'>
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
                  {/* {startTime.getTime() < Date.now() ? } */}
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
            <Button>
                {isActive ? "Participate" : "View Contest"}
            </Button>
          </CardFooter>
        </CardContent>
    </Card>
  )
}

