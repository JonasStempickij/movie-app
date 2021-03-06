import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className='navbar navbar-expand-md pt-4'>
            <a href='/' className='navbar-brand text-light'>
                Movie Dashboard
            </a>
            <button
                className='navbar-toggler navbar-dark'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div
                className='collapse navbar-collapse'
                id='navbarSupportedContent'
            >
                <ul className='navbar-nav ms-auto d-flex align-items-center gap-3 mt-3 mt-md-0'>
                    {user ? (
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    ) : (
                        <>
                            <a className='btn btn-outline-light' href='/login'>
                                <FaSignInAlt /> Login
                            </a>
                            <a className='btn text-light' href='/register'>
                                <FaUser /> Register
                            </a>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
