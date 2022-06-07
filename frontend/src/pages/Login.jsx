import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import couch from '../assets/img/couch.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='row align-items-center justify-content-center text-center '>
      {/* <div className='d-none d-md-block col-md-6 align-self-center'> */}
      <img
        className='d-none d-md-block img-fluid col-md-6 p-5'
        src={couch}
        alt=''
      />
      {/* </div> */}
      <div className='col-md-6'>
        <h1 className='my-5'>Movie Dashboard</h1>
        <p className='h2 mb-4'> Sign In</p>
        <section className='form'>
          <form className='text-center' onSubmit={onSubmit}>
            <div className='d-flex flex-column gap-3 mb-4'>
              <input
                type='email'
                className='form-control text-light'
                name='email'
                id='email'
                value={email}
                placeholder='Please enter your email'
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
            </div>
            <button
              type='submit'
              className='btn btn-danger w-100 text-uppercase fs-3'
            >
              Sign In
            </button>
            <sub>
              Don't have an account?{' '}
              <a className='text-light' href='/register'>
                Sign Up
              </a>
            </sub>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
