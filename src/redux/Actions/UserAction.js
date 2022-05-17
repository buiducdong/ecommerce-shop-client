import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_RESET,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_FAIL,
} from '../Constants/UserContants';
import axios from 'axios';
import { ORDER_LIST_RESET } from '../Constants/OrderConstants';
import { URL } from '../Url';

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/login', { email, password }, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// REGISTER
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users', { name, email, password }, config);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  document.location.href = '/login';
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAIL_RESET });
  dispatch({ type: ORDER_LIST_RESET });
};

// GET DETAIL USER
export const getDetailUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.get(`${URL}/api/users/` + id, config);
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message ? err.response.data.message : err.message;

    if (message === 'Not Authorized, token failed') {
      dispatch({ type: USER_LOGOUT });

      localStorage.removeItem('userInfo');
    }
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: message,
    });
  }
};

// UPDATE PROFILE USER
export const updateProfileUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.put(`${URL}/api/users/profile`, user, config);
    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    const message =
      err.response && err.response.data.message ? err.response.data.message : err.message;

    if (message === 'Not Authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload: message,
    });
  }
};
