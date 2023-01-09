import {
  ADMIN_GET_ALL_USER_DETAILS_FAILURE,
  ADMIN_GET_ALL_USER_DETAILS_REQUEST,
  ADMIN_GET_ALL_USER_DETAILS_SUCCESS,
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
