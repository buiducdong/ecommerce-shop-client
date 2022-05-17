import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../LoadingError/Toast';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { toast } from 'react-toastify';
import { updateProfileUser } from '../../redux/Actions/UserAction';

const ProfileTabs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const toastId = useRef(null);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const { user, loading, error } = userDetail;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: loadingUpdate } = userUpdateProfile;

  const toastObject = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cfPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Password doese not match', toastObject);
      }
    } else {
      dispatch(updateProfileUser({ id: user._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Profile has Updated', toastObject);
      }
    }
  };
  return (
    <>
      <Toast />
      {error && <Message variant={'alert-danger'}>{error}</Message>}
      {loading && <Loading />}
      {loadingUpdate && <Loading />}
      <form className='row  form-container' onSubmit={handleSubmit}>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-fn'>UserName</label>
            <input
              className='form-control'
              required
              value={name}
              type='text'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form'>
            <label for='account-email'>E-mail Address</label>
            <input
              className='form-control'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type='email'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-pass'>New Password</label>
            <input
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-confirm-pass'>Confirm Password</label>
            <input
              className='form-control'
              value={cfPassword}
              onChange={(e) => setCfPassword(e.target.value)}
              type='password'
            />
          </div>
        </div>
        <button type='submit'>Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
