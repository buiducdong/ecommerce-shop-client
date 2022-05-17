import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import { useSelector } from 'react-redux';
import { login } from '../redux/Actions/UserAction';
import { useDispatch } from 'react-redux';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const handleLogin = (e) => {
    console.log(email, password);
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Header />
      <div className='container d-flex flex-column justify-content-center align-items-center login-center'>
        {error && <Message variant='alert-danger'>{error}</Message>}
        {loading && <Loading></Loading>}
        <form className='Login col-md-8 col-lg-4 col-11' onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          <button type='submit'>Login</button>
          <p>
            <Link to={redirect ? '/register?redirect=' + redirect : '/register'}>
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
