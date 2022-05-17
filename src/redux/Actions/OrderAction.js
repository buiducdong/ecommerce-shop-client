import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../Constants/CartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../Constants/OrderConstants';
import { URL } from '../Url';
import { logout } from './UserAction';

// CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.post(`${URL}/api/orders`, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem('cartItems');
  } catch (err) {
    const message =
      err.response && err.response.data.message ? err.response.data.message : err.message;

    if (message === 'Not Authorized, token failed') {
      console.log(message);
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

// GET ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.get(`${URL}/api/orders/` + id, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message ? err.response.data.message : err.message;

    if (message === 'Not Authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER PAY
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.put(
      `${URL}/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message ? err.response.data.message : err.message;

    if (message === 'Not Authorized, token failed') {
      console.log(message);
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

// GET ORDER LIST
export const getListOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.get(`${URL}/api/orders`, config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message ? err.response.data.message : err.message;

    if (message === 'Not Authorized, token failed') {
      console.log(message);
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};
