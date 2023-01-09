import axios from 'axios';
import {
  ADMIN_GET_ALL_USER_DETAILS_FAILURE,
  ADMIN_GET_ALL_USER_DETAILS_REQUEST,
  ADMIN_GET_ALL_USER_DETAILS_SUCCESS,
} from '../constants/adminConstants';

export const adminGetAllUserDetailsAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_USER_DETAILS_REQUEST,
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
        `${process.env.REACT_APP_END_POINT}api/admin/user-details-memories`,
        config,
      );
      dispatch({ type: ADMIN_GET_ALL_USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_GET_ALL_USER_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
