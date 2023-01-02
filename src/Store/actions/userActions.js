import axios from 'axios';
import { MEMORIES_GET_RESET } from '../constants/memoriesConstants';
import {
  USER_EDIT_DETAILS_FAILURE,
  USER_EDIT_DETAILS_REQUEST,
  USER_EDIT_DETAILS_SUCCESS,
  USER_FORGOT_PW_SEND_EMAIL_FAILURE,
  USER_FORGOT_PW_SEND_EMAIL_REQUEST,
  USER_FORGOT_PW_SEND_EMAIL_SUCCESS,
  USER_INFO_DETAILS_FAILURE,
  USER_INFO_DETAILS_REQUEST,
  USER_INFO_DETAILS_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PAGE_HITS_FAILURE,
  USER_PAGE_HITS_REQUEST,
  USER_PAGE_HITS_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAILURE,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
} from '../constants/userConstants';

//User Login
export const loginAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_END_POINT}api/login`,
      formData,
      config,
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(userInfoDetailsAction());
    dispatch(userPageHitsAction());
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//User logout
export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: MEMORIES_GET_RESET });
};

// User Registration
export const registerAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_END_POINT}api/register`,
      formData,
      config,
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//User Forgot password Send email
export const userForgotPWSendEmailAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PW_SEND_EMAIL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_END_POINT}api/forgot-password`,
      { email: email },
      config,
    );
    dispatch({ type: USER_FORGOT_PW_SEND_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PW_SEND_EMAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//User Reset Password
export const userResetPasswordAction = (updatedInfo) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_END_POINT}api/resetpassword/${updatedInfo.resetPasswordToken}`,
      updatedInfo,
      config,
    );
    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET: USER INFO DETAILS
export const userInfoDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_INFO_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_END_POINT}api/user-details`,
      config,
    );
    dispatch({ type: USER_INFO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_INFO_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//PUT: User EDIT Password
export const userEditDetailAction =
  (id, formaData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_EDIT_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_END_POINT}api/user/${id.id}`,
        formaData,
        config,
      );
      dispatch({ type: USER_EDIT_DETAILS_SUCCESS, payload: data });
      dispatch(userInfoDetailsAction());
    } catch (error) {
      dispatch({
        type: USER_EDIT_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//GET: User get ip and login hits of user
export const userPageHitsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PAGE_HITS_REQUEST,
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_END_POINT}api/page-hits`,
    );
    dispatch({ type: USER_PAGE_HITS_SUCCESS, payload: data });
    dispatch(userInfoDetailsAction());
  } catch (error) {
    dispatch({
      type: USER_PAGE_HITS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
