import React from 'react'

const Contests = () => {
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
                </div>
          </div>
        </div>
    </div>
  )
}

export default Contests
