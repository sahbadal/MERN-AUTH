import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className='bg-gray-100 shadow-md'>
            <div className='max-w-[90%] m-auto flex justify-between items-center p-4'>
                <div className='flex items-center space-x-2 cursor-pointer'>
                    <img src={logo} alt="Logo" className='h-14' />
                    <h1 className='text-3xl font-bold text-blue-600'>AUTH</h1>
                </div>
                <button onClick={() => navigate('/login')}
                    className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition'>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Navbar;
