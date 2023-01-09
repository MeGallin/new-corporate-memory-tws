import axios from 'axios';
import {
  ADMIN_GET_ALL_USER_DETAILS_FAILURE,
  ADMIN_GET_ALL_USER_DETAILS_REQUEST,
  ADMIN_GET_ALL_USER_DETAILS_SUCCESS,
  ADMIN_IS_ADMIN_FAILURE,
  ADMIN_IS_ADMIN_REQUEST,
  ADMIN_IS_ADMIN_SUCCESS,
  ADMIN_IS_SUSPENDED_FAILURE,
  ADMIN_IS_SUSPENDED_REQUEST,
  ADMIN_IS_SUSPENDED_SUCCESS,
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

//PUT: ADMIN isAdmin toggle
export const adminIsAdminAction =
  (adminIsAdmin) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_IS_ADMIN_REQUEST,
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
        `${process.env.REACT_APP_END_POINT}api/admin/user-is-admin/${adminIsAdmin.id}`,
        { isAdmin: adminIsAdmin.toggledValue },
        config,
      );
      dispatch({ type: ADMIN_IS_ADMIN_SUCCESS, payload: data });
      dispatch(adminGetAllUserDetailsAction());
    } catch (error) {
      dispatch({
        type: ADMIN_IS_ADMIN_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//PUT: ADMIN isSuspended toggle
export const adminIsSuspendedAction =
  (adminIsSuspended) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_IS_SUSPENDED_REQUEST,
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
        `${process.env.REACT_APP_END_POINT}api/admin/user-is-suspended/${adminIsSuspended.id}`,
        { isSuspended: adminIsSuspended.toggledValue },
        config,
      );
      dispatch({ type: ADMIN_IS_SUSPENDED_SUCCESS, payload: data });
      dispatch(adminGetAllUserDetailsAction());
    } catch (error) {
      dispatch({
        type: ADMIN_IS_SUSPENDED_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
