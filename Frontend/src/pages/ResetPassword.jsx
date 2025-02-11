import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import { FaEnvelope, FaLock } from 'react-icons/fa'
import logo from "../assets/logo.jpg";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {

    const navigate = useNavigate();

    const { backendUrl } = useContext(AppContext);
    axios.defaults.withCredentials = true;

    const inputRefs = useRef([]);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState('');
    const [otp, setOtp] = useState(0);
    const [isOtpSubmited, setIsOtpSubmited] = useState(false);

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

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && setIsEmailSent(true)

        } catch (error) {
            toast.error(error.message);
        }
    };

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value);
        setOtp(otpArray.join(''));
        setIsOtpSubmited(true);
    };

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword });
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && navigate('/login')

        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className='min-h-screen flex flex-col bg-gray-100'>
            {/* Navbar */}
            <div className="bg-transparent py-4 px-20 flex items-center">
                <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                    <img src={logo} alt="Logo" className="h-14" />
                    <h1 className='text-3xl font-bold text-blue-600'>AUTH</h1>
                </div>
            </div>

            {/* enter email id */}
            <div className="flex flex-grow items-center justify-center p-6">
                {!isEmailSent &&
                    <form onSubmit={onSubmitEmail} className="bg-gray-900 text-white p-10 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-3xl font-semibold text-center">Reset Password</h2>
                        <p className="text-gray-400 text-center text-sm mb-6">
                            Enter your registered email address.
                        </p>
                        <div className="mb-4 relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Email ID"
                                required
                                className="w-full bg-gray-800 text-white pl-10 py-2 rounded focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                }
                {/* otp input form */}
                {!isOtpSubmited && isEmailSent &&
                    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-3xl font-semibold text-center">Reset Password OTP</h2>
                        <p className="text-gray-400 text-center text-sm mb-6">
                            Enter the OTP sent to your email.
                        </p>

                        <form onSubmit={onSubmitOtp}>
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
                                Submit
                            </button>
                        </form>
                    </div>
                }

                {/* enter new password */}
                {isOtpSubmited && isEmailSent &&
                    <form onSubmit={onSubmitNewPassword} className="bg-gray-900 text-white p-10 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-3xl font-semibold text-center">New Password</h2>
                        <p className="text-gray-400 text-center text-sm mb-6">
                            Enter the new password below.
                        </p>
                        <div className="mb-4 relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                onChange={e => setNewPassword(e.target.value)}
                                value={newPassword}
                                type="password"
                                placeholder="new password"
                                required
                                className="w-full bg-gray-800 text-white pl-10 py-2 rounded focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                }

            </div>

        </div>
    )
}

export default ResetPassword