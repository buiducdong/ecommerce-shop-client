import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { saveShippingAddress } from '../redux/Actions/CartAction';

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('./payment');
  };
  return (
    <>
      <Header />
      <div className='container d-flex justify-content-center align-items-center login-center'>
        <form className='Login col-md-8 col-lg-4 col-11' onSubmit={handleSubmit}>
          <h6>DELIVERY ADDRESS</h6>
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type='text'
            placeholder='Enter address'
          />
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            placeholder='Enter city'
          />
          <input
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            type='text'
            placeholder='Enter postal code'
          />
          <input
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type='text'
            placeholder='Enter country'
          />
          <button type='submit'>
            <Link to='/payment' className='text-white'>
              Continue
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
