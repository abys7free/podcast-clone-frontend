import React from 'react'
import { Helmet } from 'react-helmet-async'

export const Podcast = () => {
  return (

    <div className="h-screen border-double border-t-4 ">
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      <h1 className='text-white p-5'>Podcasts</h1>
    </div>
  )
}