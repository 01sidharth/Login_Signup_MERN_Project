import React from 'react'

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-teal-200 to-teal-500 portrait:min-w-full portrait:h-screen landscape:w-screen landscape:h-screen flex justify-center items-center'>
        <h1 className='portrait:text-sm landscape:text-2xl font-mono font-extrabold   animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl'>Welcome to HomePage</h1>
    </div>
  )
}

export default Home