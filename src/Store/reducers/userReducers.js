import {
  GOOGLE_USER_LOGIN_FAILURE,
  GOOGLE_USER_LOGIN_REQUEST,
  GOOGLE_USER_LOGIN_SUCCESS,
  GOOGLE_USER_LOGOUT,
  USER_EDIT_DETAILS_FAILURE,
  USER_EDIT_DETAILS_REQUEST,
  USER_EDIT_DETAILS_SUCCESS,
  USER_FORGOT_PW_SEND_EMAIL_FAILURE,
  USER_FORGOT_PW_SEND_EMAIL_REQUEST,
  USER_FORGOT_PW_SEND_EMAIL_SUCCESS,
  USER_INFO_DETAILS_FAILURE,
  USER_INFO_DETAILS_REQUEST,
  USER_INFO_DETAILS_RESET,
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

//Reset Password
export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_RESET_PASSWORD_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

//GET: User Info Details
export const userInfoDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_INFO_DETAILS_REQUEST:
      return { loading: true };
    case USER_INFO_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case USER_INFO_DETAILS_RESET:
      return {};
    case USER_INFO_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

//PUT: User EDIT Details
export const userEditDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_DETAILS_REQUEST:
      return { loading: true };
    case USER_EDIT_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case USER_EDIT_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

// GOOGLE USER LOGIN REDUCER
export const googleUserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_USER_LOGIN_REQUEST:
      return { loading: true };
    case GOOGLE_USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case GOOGLE_USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case GOOGLE_USER_LOGOUT:
      return {};
    default:
      return { ...state };
  }
};
