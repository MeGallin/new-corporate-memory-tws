import {
  ADMIN_DELETE_ALL_USER_DATA_FAILURE,
  ADMIN_DELETE_ALL_USER_DATA_REQUEST,
  ADMIN_DELETE_ALL_USER_DATA_RESET,
  ADMIN_DELETE_ALL_USER_DATA_SUCCESS,
  ADMIN_GET_ALL_USER_DETAILS_FAILURE,
  ADMIN_GET_ALL_USER_DETAILS_REQUEST,
  ADMIN_GET_ALL_USER_DETAILS_SUCCESS,
  ADMIN_IS_ADMIN_FAILURE,
  ADMIN_IS_ADMIN_REQUEST,
  ADMIN_IS_ADMIN_RESET,
  ADMIN_IS_ADMIN_SUCCESS,
  ADMIN_IS_SUSPENDED_FAILURE,
  ADMIN_IS_SUSPENDED_REQUEST,
  ADMIN_IS_SUSPENDED_RESET,
  ADMIN_IS_SUSPENDED_SUCCESS,
} from '../constants/adminConstants';

export const adminGetAllUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_USER_DETAILS_REQUEST:
      return { loading: true };
    case ADMIN_GET_ALL_USER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case ADMIN_GET_ALL_USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// PUT: ADMIN isAdmin reducer
export const adminIsAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_IS_ADMIN_REQUEST:
      return { loading: true };
    case ADMIN_IS_ADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
        isAdmin: action.payload,
      };
    case ADMIN_IS_ADMIN_RESET:
      return {};
    case ADMIN_IS_ADMIN_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// PUT: ADMIN isSuspended reducer
export const adminIsSuspendedReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_IS_SUSPENDED_REQUEST:
      return { loading: true };
    case ADMIN_IS_SUSPENDED_SUCCESS:
      return {
        loading: false,
        success: true,
        isSuspended: action.payload,
      };
    case ADMIN_IS_SUSPENDED_RESET:
      return {};
    case ADMIN_IS_SUSPENDED_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// DELETE: ADMIN delete all user data reducer
export const adminDeleteAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_ALL_USER_DATA_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_ALL_USER_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case ADMIN_DELETE_ALL_USER_DATA_RESET:
      return {};
    case ADMIN_DELETE_ALL_USER_DATA_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
