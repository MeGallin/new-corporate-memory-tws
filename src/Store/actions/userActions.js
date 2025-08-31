import axios from 'axios';
import { buildApiUrl } from '../utils/api';
import { MEMORIES_GET_RESET } from '../constants/memoriesConstants';
import { CONTACT_FORM_RESET } from '../constants/contactFormConstants';
import {
  GOOGLE_USER_LOGIN_FAILURE,
  GOOGLE_USER_LOGIN_REQUEST,
  GOOGLE_USER_LOGIN_SUCCESS,
  GOOGLE_USER_LOGIN_RESET,
  USER_EDIT_DETAILS_FAILURE,
  USER_EDIT_DETAILS_REQUEST,
  USER_EDIT_DETAILS_SUCCESS,
  USER_EDIT_DETAILS_RESET,
  USER_FORGOT_PW_SEND_EMAIL_FAILURE,
  USER_FORGOT_PW_SEND_EMAIL_REQUEST,
  USER_FORGOT_PW_SEND_EMAIL_SUCCESS,
  USER_FORGOT_PW_SEND_EMAIL_RESET,
  USER_INFO_DETAILS_FAILURE,
  USER_INFO_DETAILS_REQUEST,
  USER_INFO_DETAILS_RESET,
  USER_INFO_DETAILS_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_RESET,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_RESET_PASSWORD_FAILURE,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_RESET,
} from '../constants/userConstants';

// Utility functions for validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 8;
};

// Token management utilities
const setSecureToken = (tokenData) => {
  localStorage.setItem('userInfo', JSON.stringify(tokenData));

  // Set expiration time if provided by server
  if (tokenData.expiresIn) {
    const expirationTime = new Date().getTime() + tokenData.expiresIn * 1000;
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }
};

const isTokenExpired = () => {
  const expiration = localStorage.getItem('tokenExpiration');
  if (!expiration) return false;

  return new Date().getTime() > parseInt(expiration);
};

// Utility function to handle API errors consistently
const handleApiError = (error) => {
  let errorMessage = 'An unexpected error occurred';

  if (error.response) {
    errorMessage =
      error.response.data?.message || `Server Error: ${error.response.status}`;
  } else if (error.request) {
    errorMessage = 'Network error. Please check your connection.';
  } else {
    errorMessage = error.message;
  }

  console.error('API Error:', { error, errorMessage });
  return errorMessage;
};

//GET: USER INFO DETAILS
export const userInfoDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_INFO_DETAILS_REQUEST,
    });

    const state = getState();
    const userInfo =
      state.userLogin?.userInfo || state.googleUserLogin?.userInfo;

    if (!userInfo) {
      dispatch({
        type: USER_INFO_DETAILS_FAILURE,
        payload: 'No user authentication found',
      });
      return;
    }

    // Check if token is expired
    if (isTokenExpired()) {
      dispatch({
        type: USER_INFO_DETAILS_FAILURE,
        payload: 'Session expired. Please log in again.',
      });
      dispatch(logoutAction());
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(buildApiUrl('userDetails'), config);
    dispatch({ type: USER_INFO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      dispatch({
        type: USER_INFO_DETAILS_FAILURE,
        payload: 'Session expired. Please log in again.',
      });
      dispatch(logoutAction());
      return;
    }

    dispatch({
      type: USER_INFO_DETAILS_FAILURE,
      payload: handleApiError(error),
    });
  }
};

//User Login
export const loginAction = (formData) => async (dispatch) => {
  try {
    // Client-side validation
    if (!formData.email || !validateEmail(formData.email)) {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: 'Please enter a valid email address',
      });
      return;
    }

    if (!formData.password) {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: 'Password is required',
      });
      return;
    }

    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(buildApiUrl('login'), formData, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    setSecureToken(data);
    dispatch(userInfoDetailsAction());
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: handleApiError(error),
    });
  }
};

//GOOGLE User Login
export const googleUserLoginAction = (googleRes) => async (dispatch) => {
  try {
    if (!googleRes?.credential) {
      dispatch({
        type: GOOGLE_USER_LOGIN_FAILURE,
        payload: 'Invalid Google authentication response',
      });
      return;
    }

    dispatch({
      type: GOOGLE_USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${googleRes.credential}`,
      },
    };

    const { data } = await axios.post(buildApiUrl('googleLogin'), {}, config);

    dispatch({ type: GOOGLE_USER_LOGIN_SUCCESS, payload: data });
    setSecureToken(data);
    dispatch(userInfoDetailsAction());
  } catch (error) {
    dispatch({
      type: GOOGLE_USER_LOGIN_FAILURE,
      payload: handleApiError(error),
    });
  }
};

//User logout
export const logoutAction = () => (dispatch) => {
  // Clear all stored authentication data
  localStorage.removeItem('userInfo');
  localStorage.removeItem('tokenExpiration');

  // Reset all user-related Redux state
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: MEMORIES_GET_RESET });
  dispatch({ type: GOOGLE_USER_LOGIN_RESET });
  dispatch({ type: USER_INFO_DETAILS_RESET });
  dispatch({ type: USER_LOGIN_RESET });
  dispatch({ type: USER_REGISTER_RESET });
  dispatch({ type: USER_EDIT_DETAILS_RESET });
  dispatch({ type: USER_FORGOT_PW_SEND_EMAIL_RESET });
  dispatch({ type: USER_RESET_PASSWORD_RESET });
  dispatch({ type: CONTACT_FORM_RESET });
};

// User Registration
export const registerAction = (formData) => async (dispatch) => {
  try {
    // Client-side validation
    if (!formData.email || !validateEmail(formData.email)) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: 'Please enter a valid email address',
      });
      return;
    }

    if (!formData.password || !validatePassword(formData.password)) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: 'Password must be at least 8 characters long',
      });
      return;
    }

    if (!formData.name) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: 'Name is required',
      });
      return;
    }

    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      buildApiUrl('register'),
      formData,
      config,
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: handleApiError(error),
    });
  }
};

//User Forgot password Send email
export const userForgotPWSendEmailAction = (email) => async (dispatch) => {
  try {
    if (!email || !validateEmail(email)) {
      dispatch({
        type: USER_FORGOT_PW_SEND_EMAIL_FAILURE,
        payload: 'Please enter a valid email address',
      });
      return;
    }

    dispatch({
      type: USER_FORGOT_PW_SEND_EMAIL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      buildApiUrl('forgotPassword'),
      { email: email },
      config,
    );
    dispatch({ type: USER_FORGOT_PW_SEND_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PW_SEND_EMAIL_FAILURE,
      payload: handleApiError(error),
    });
  }
};

//User Reset Password
export const userResetPasswordAction = (updatedInfo) => async (dispatch) => {
  try {
    if (!updatedInfo.password || !validatePassword(updatedInfo.password)) {
      dispatch({
        type: USER_RESET_PASSWORD_FAILURE,
        payload: 'Password must be at least 8 characters long',
      });
      return;
    }

    if (!updatedInfo.resetPasswordToken) {
      dispatch({
        type: USER_RESET_PASSWORD_FAILURE,
        payload: 'Invalid or missing reset token',
      });
      return;
    }

    dispatch({
      type: USER_RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      buildApiUrl('resetPassword', updatedInfo.resetPasswordToken),
      updatedInfo,
      config,
    );
    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAILURE,
      payload: handleApiError(error),
    });
  }
};

//PUT: User EDIT Details
export const userEditDetailAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_EDIT_DETAILS_REQUEST,
      });

      const state = getState();
      const userInfo =
        state.userLogin?.userInfo || state.googleUserLogin?.userInfo;

      if (!userInfo) {
        dispatch({
          type: USER_EDIT_DETAILS_FAILURE,
          payload: 'User not authenticated',
        });
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        buildApiUrl('userDetails'),
        formData,
        config,
      );
      dispatch({ type: USER_EDIT_DETAILS_SUCCESS, payload: data });
      dispatch(userInfoDetailsAction());
    } catch (error) {
      dispatch({
        type: USER_EDIT_DETAILS_FAILURE,
        payload: handleApiError(error),
      });
    }
  };
