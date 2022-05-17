import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
} from './Reducers/ProductReducer';
import { cartReducer } from './Reducers/CartReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  updateUserProfileReducer,
} from './Reducers/UserReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from './Reducers/OrderReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: updateUserProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
});

// CART ITEM
const cartItemLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// LOGIN
const userInfoLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// SHIPPING ADDRESS
const shippingAddressLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// PAYMENT METHOD
// const paymentMethodLocalStorage = localStorage.getItem('paymentMethod')
//   ? JSON.parse(localStorage.getItem('paymentMethod'))
//   : {};

const initialState = {
  cart: {
    cartItems: cartItemLocalStorage,
    shippingAddress: shippingAddressLocalStorage,
  },
  userLogin: {
    userInfo: userInfoLocalStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
