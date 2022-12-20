import {
  USER_FORGOT_PW_SEND_EMAIL_FAILURE,
  USER_FORGOT_PW_SEND_EMAIL_REQUEST,
  USER_FORGOT_PW_SEND_EMAIL_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

// Login a registered User
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return { ...state };
  }
};
//Register a User
export const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
        error: null,
      };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

//Forgot Password send email
export const userForgotPWSendEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PW_SEND_EMAIL_REQUEST:
      return { loading: true };
    case USER_FORGOT_PW_SEND_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_FORGOT_PW_SEND_EMAIL_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
