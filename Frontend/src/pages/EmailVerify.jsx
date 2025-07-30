import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/auth-logo.png";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const { backendUrl, getUserData, isLoggedin, userData } = useContext(AppContext);
    const inputRefs = useRef([]);

    const handleInput = (e, index) => {
        const { value } = e.target;
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim().slice(0, 6);
        if (/^\d{1,6}$/.test(pasteData)) {
            pasteData.split("").forEach((char, i) => {
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = char;
                }
            });
            inputRefs.current[pasteData.length - 1]?.focus();
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const otpArray = inputRefs.current.map(e => e.value);
            const otp = otpArray.join('');

            const { data } = await axios.post(`${backendUrl}/api/auth/verify-email`, { otp });

            if (data.success) {
                toast.success(data.message);
                getUserData();
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        isLoggedin && userData && userData.isAccountVerified && navigate('/');
    }, [isLoggedin, userData])

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <div className="bg-transparent py-4 px-20 flex items-center">
                <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                    <img src={logo} alt="Logo" className="h-14" />
                    <h1 className='text-3xl font-bold text-blue-600'>AUTH</h1>
                </div>
            </div>

            {/* OTP Verification Form */}
            <div className="flex flex-grow items-center justify-center p-6">
                <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-3xl font-semibold text-center">Verify OTP</h2>
                    <p className="text-gray-400 text-center text-sm mb-6">
                        Enter the OTP sent to your email.
                    </p>

                    <form onSubmit={onSubmitHandler}>
                        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
                            {Array(6).fill(0).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-12 h-12 text-center bg-gray-800 border-none rounded text-white text-2xl focus:outline-none"
                                    ref={e => inputRefs.current[index] = e}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Verify Email
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
