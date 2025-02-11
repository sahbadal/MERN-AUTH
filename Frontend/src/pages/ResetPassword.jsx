import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const ResetPassword = () => {

    const navigate = useNavigate();

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
                <form className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-3xl font-semibold text-center">Reset Password</h2>
                    <p className="text-gray-400 text-center text-sm mb-6">
                        Enter your registered email address.
                    </p>
                </form>
            </div>

        </div>
    )
}

export default ResetPassword