
import React from 'react'
import { Card } from './ui/card';

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
        
    </Card>
  )
}

