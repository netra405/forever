import React from 'react'

const NewsletterBox = () => {

    const onSubitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est adipisci veniam dolore nam vero dolor earum, quidem quos, sint eaque corrupti voluptate itaque ratione numquam, eligendi suscipit aut laboriosam praesentium! 
      </p>
      <form onSubmit={onSubitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUCSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
