import React from 'react'

const Header = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-3xl font-semibold text-gray-800">Hey Developer! 🚀</h1>
            <h2 className="text-5xl font-bold text-blue-600 mt-3">Let's Build Something Amazing</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl">
                Unlock the power of innovation and start creating impactful solutions.
                The journey of a thousand miles begins with a single step. Let's go!
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
                Get Started
            </button>
        </div>
    )
}

export default Header