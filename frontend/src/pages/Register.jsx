import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import couch from '../assets/img/couch.svg';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password,
            };
            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className='d-flex gap-md-3 h-100 align-items-center'>
                <img
                    className='d-none d-md-block img-fluid col-md-6'
                    src={couch}
                    alt=''
                />
                <div className='d-flex text-center flex-column align-items-strech mx-auto w-md-75'>
                    <p className='h2 mb-4'>Sign Up</p>
                    <form onSubmit={onSubmit}>
                        <div className='d-flex flex-column gap-3 mb-4'>
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                id='name'
                                value={name}
                                placeholder='Enter your name'
                                onChange={onChange}
                            />
                            <input
                                type='email'
                                className='form-control'
                                name='email'
                                id='email'
                                value={email}
                                placeholder='Enter your email'
                                onChange={onChange}
                            />
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                id='password'
                                value={password}
                                placeholder='Enter password'
                                onChange={onChange}
                            />
                            <input
                                type='password'
                                className='form-control'
                                name='password2'
                                id='password2'
                                value={password2}
                                placeholder='Confirm password'
                                onChange={onChange}
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-danger w-100 text-uppercase fs-3'
                        >
                            Sign Up
                        </button>
                        <sub>
                            Already have an account ?{' '}
                            <a className='text-light' href='/login'>
                                Sign In
                            </a>
                        </sub>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Register;
