import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    CREACTE_USER_REQUEST,
    CREACTE_USER_SUCCESS,
    CREACTE_USER_FAIL,
    GET_GIFT_REQUEST,
    GET_GIFT_SUCCESS,
    GET_GIFT_FAIL,
    ADD_GIFT_REQUEST,
    ADD_GIFT_SUCCESS,
    ADD_GIFT_FAIL,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAIL,
    SEND_EMAIL_RESET_REQUEST,
    SEND_EMAIL_RESET_SUCCESS,
    SEND_EMAIL_RESET_FAIL,
    UPDATE_PASS_EMAIL_RESET_REQUEST,
    UPDATE_PASS_EMAIL_RESET_SUCCESS,
    UPDATE_PASS_EMAIL_RESET_FAIL,
} from '../Constants/UserContants';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../Constants/OrderConstants';
// import { addToCart, listCart } from './cartActions';
import { CART_LIST_MY_RESET } from '../Constants/CartConstants';

// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/users/login`, { email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        // dispatch(listCart());
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: CART_LIST_MY_RESET });
};

// REGISTER
export const register = (name, email, phone, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/users`, { name, email, phone, password }, config);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/user`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// UPDATE PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};

export const updateUserPassword = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);
        dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};
// ALL USER
export const listUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const { data } = await axios.get(`/api/users/all`);

        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        });
    }
};

// CREATE USERS
export const createUser =
    ({ name, email, phone, password }) =>
    async (dispatch) => {
        try {
            dispatch({ type: CREACTE_USER_REQUEST });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            };

            const { data } = await axios.post(`/api/verifiedEmail/verified`, { name, email, phone, password }, config);
            dispatch({ type: CREACTE_USER_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: CREACTE_USER_FAIL,
                payload: message,
            });
        }
    };

// GET GIFT ALL

export const getGiftAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_GIFT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/discount/gift`, config);
        dispatch({ type: GET_GIFT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: GET_GIFT_FAIL,
            payload: message,
        });
    }
};

//ADD GIFT
export const addGiftAction = (values) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_GIFT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/addGift`, values, config);
        dispatch({ type: ADD_GIFT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ADD_GIFT_FAIL,
            payload: message,
        });
    }
};

//VERIFY EMAIL
export const verifyEmailAction = (token) => async (dispatch, getState) => {
    try {
        dispatch({ type: VERIFY_EMAIL_REQUEST });

        const { data } = await axios.post(`/api/verifiedEmail/verified/${token}`, {});
        dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: VERIFY_EMAIL_FAIL,
            payload: message,
        });
    }
};

//SEND EMAIL
export const sendEmailAction = (email) => async (dispatch, getState) => {
    try {
        dispatch({ type: SEND_EMAIL_RESET_REQUEST });

        const { data } = await axios.post(`/api/forgotPass/forgotPassword`, { email });
        dispatch({ type: SEND_EMAIL_RESET_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: SEND_EMAIL_RESET_FAIL,
            payload: message,
        });
    }
};

//RESET PASS EMAIL
export const resetPasswordAction =
    ({ email, password }) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: UPDATE_PASS_EMAIL_RESET_REQUEST });

            const { data } = await axios.post(`/api/forgotPass/resetPassword/${email}`, { password });
            dispatch({ type: UPDATE_PASS_EMAIL_RESET_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: UPDATE_PASS_EMAIL_RESET_FAIL,
                payload: message,
            });
        }
    };
