import React from 'react'
import logo from '../assets/logo.jpg'


const Navbar = () => {
    return (
        <div className='max-w-[90%] m-auto flex justify-between items-center p-4'>
            <div className='flex items-center space-x-1 cursor-pointer'>
                <img src={logo} alt="Logo" className='h-14' />
                <h1 className='text-3xl font-bold text-blue-600'>AUTH</h1>
            </div>
            <button className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 duration-100'>Login</button>
        </div>
    )
}

export default Navbar