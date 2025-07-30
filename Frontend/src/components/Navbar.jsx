import { useContext } from 'react';
import logo from '../assets/auth-logo.png';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate();

    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
            if (data.success) {
                navigate('email-verify');
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
            data.success && setIsLoggedin(false);
            data.success && setUserData(false);
            navigate('/');

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='bg-gray-100 shadow-md'>
            <div className='max-w-[90%] m-auto flex justify-between items-center p-4'>
                <div className='flex items-center space-x-2 cursor-pointer'>
                    <img src={logo} alt="Logo" className='h-14' />
                    <h1 className='text-3xl font-bold text-blue-600'>AUTH</h1>
                </div>
                {userData
                    ?
                    <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white relative group cursor-pointer'>
                        {userData.name[0].toUpperCase()}
                        <div className=' absolute hidden group-hover:block text-black top-0 right-0 z-10 rounded pt-10'>
                            <ul className=' list-none m-0 p-2 bg-gray-200 text-sm'>
                                {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 cursor-pointer hover:bg-gray-300'>Verify Email</li>}
                                <li onClick={logout} className='py-1 px-2 cursor-pointer hover:bg-gray-300 pr-10'>Logout</li>
                            </ul>
                        </div>
                    </div>
                    :
                    <button onClick={() => navigate('/login')}
                        className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
                        Login
                    </button>
                }
            </div>
        </div>
    );
};

export default Navbar;
