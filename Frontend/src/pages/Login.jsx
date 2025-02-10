import React, { useContext, useState } from "react";
import { FaGoogle, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.jpg";
import { AppContext } from "../context/AppContext.jsx";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)

    const [isSignUp, setIsSignUp] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;

            if (isSignUp) {
                const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });

                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });

                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div className="min-h-screen flex flex-col bg-gray-100 ">
            {/* Navbar */}
            <div className="bg-transparent py-4 px-20 flex items-center">
                <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                    <img src={logo} alt="Logo" className="h-14" />
                    <h1 className="text-3xl font-bold text-blue-600">AUTH</h1>
                </div>
            </div>

            {/* Login / Signup Form */}
            <div className="flex flex-grow items-center justify-center p-6">
                <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-3xl font-semibold text-center">
                        {isSignUp ? "Create Account" : "Login"}
                    </h2>
                    <p className="text-gray-400 text-center text-sm mb-6">
                        {isSignUp ? "Sign up to get started" : "Welcome back! Log in"}
                    </p>

                    <form onSubmit={onSubmitHandler}>
                        {isSignUp && (
                            <div className="mb-4 relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-gray-800 text-white pl-10 py-2 rounded focus:outline-none"
                                />
                            </div>
                        )}

                        <div className="mb-4 relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Email ID"
                                className="w-full bg-gray-800 text-white pl-10 py-2 rounded focus:outline-none"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                                className="w-full bg-gray-800 text-white pl-10 py-2 rounded focus:outline-none"
                            />
                        </div>

                        <div className="text-right text-sm mb-4">
                            <p onClick={() => navigate('/reset-password')} className="text-blue-400 hover:underline cursor-pointer">
                                Forgot password?
                            </p>
                        </div>

                        <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
                            {isSignUp ? "Sign Up" : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center">
                        <hr className="w-full border-gray-700" />
                        <span className="mx-3 text-gray-400">OR</span>
                        <hr className="w-full border-gray-700" />
                    </div>

                    <button className="w-full mt-4 bg-red-500 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition">
                        <FaGoogle /> Continue with Google
                    </button>

                    <p className="text-center mt-4 text-sm">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
                        <button
                            className="text-blue-400 hover:underline"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? "Login here" : "Sign up here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
