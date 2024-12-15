
import Contest from '@/components/contest'
import Navbar from '@/components/navbar'
import React from 'react'

export default function page():JSX.Element  {
  return (
    <div>
       <Navbar />
       <Contest/>
    </div>
  )
}

// export const dynamic = "force-dynamic";