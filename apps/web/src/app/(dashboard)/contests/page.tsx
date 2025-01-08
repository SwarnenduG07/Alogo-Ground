
import Contest from '@/components/Contest'
import Navbar from '@/components/Navbar'
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