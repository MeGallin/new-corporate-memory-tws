import axios from 'axios';
import {
  ADMIN_DELETE_ALL_USER_DATA_FAILURE,
  ADMIN_DELETE_ALL_USER_DATA_REQUEST,
  ADMIN_DELETE_ALL_USER_DATA_SUCCESS,
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

// Import logout action for session management
import { logoutAction } from './userActions';

// API configuration for admin endpoints
const ADMIN_API_CONFIG = {
  baseURL: process.env.REACT_APP_END_POINT,
  endpoints: {
    getAllUserDetails: 'api/admin/user-details-memories',
    toggleAdmin: 'api/admin/user-is-admin',
    toggleSuspended: 'api/admin/user-is-suspended',
    deleteUserData: 'api/admin/user-memories-delete',
  },
};

const buildAdminApiUrl = (endpoint, param = '') => {
  const url = `${ADMIN_API_CONFIG.baseURL}${ADMIN_API_CONFIG.endpoints[endpoint]}`;
  return param ? `${url}/${param}` : url;
};

// Utility function to get authenticated user (supports both login types)
const getAuthenticatedUser = (state) => {
  const regularUser = state.userLogin?.userInfo;
  const googleUser = state.googleUserLogin?.userInfo;
  return regularUser || googleUser;
};

// Utility function to create auth headers
const createAuthConfig = (userInfo) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`,
  },
});

// Utility function to handle API errors consistently
const handleAdminApiError = (error) => {
  let errorMessage = 'An unexpected error occurred';

  if (error.response) {
    errorMessage =
      error.response.data?.message || `Server Error: ${error.response.status}`;
  } else if (error.request) {
    errorMessage = 'Network error. Please check your connection.';
  } else {
    errorMessage = error.message;
  }

  console.error('Admin API Error:', { error, errorMessage });
  return errorMessage;
};

// Utility function to validate admin operations
const validateAdminOperation = (
  userInfo,
  operationType = 'admin operation',
) => {
  if (!userInfo) {
    return { isValid: false, error: 'User not authenticated' };
  }

  // You could add additional admin-specific validations here
  // For example, checking if user has admin privileges

  return { isValid: true };
};

export const adminGetAllUserDetailsAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_USER_DETAILS_REQUEST,
      });

      const state = getState();
      const userInfo = getAuthenticatedUser(state);

      // Validate authentication
      const validation = validateAdminOperation(
        userInfo,
        'get all user details',
      );
      if (!validation.isValid) {
        dispatch({
          type: ADMIN_GET_ALL_USER_DETAILS_FAILURE,
          payload: validation.error,
        });
        return;
      }

      const config = createAuthConfig(userInfo);

      const { data } = await axios.get(
        buildAdminApiUrl('getAllUserDetails'),
        config,
      );

      dispatch({ type: ADMIN_GET_ALL_USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      // Handle 401/403 errors - authentication/authorization issues
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch({
          type: ADMIN_GET_ALL_USER_DETAILS_FAILURE,
          payload: 'Admin access denied. Please log in again.',
        });
        dispatch(logoutAction());
        return;
      }

      dispatch({
        type: ADMIN_GET_ALL_USER_DETAILS_FAILURE,
        payload: handleAdminApiError(error),
      });
    }
  };

//PUT: ADMIN isAdmin toggle
export const adminIsAdminAction =
  (adminIsAdmin) => async (dispatch, getState) => {
    try {
      // Input validation
      if (!adminIsAdmin?.id) {
        dispatch({
          type: ADMIN_IS_ADMIN_FAILURE,
          payload: 'User ID is required for admin toggle operation',
        });
        return;
      }

      if (typeof adminIsAdmin.toggledValue !== 'boolean') {
        dispatch({
          type: ADMIN_IS_ADMIN_FAILURE,
          payload: 'Invalid admin status value',
        });
        return;
      }

      dispatch({
        type: ADMIN_IS_ADMIN_REQUEST,
      });

      const state = getState();
      const userInfo = getAuthenticatedUser(state);

      // Validate authentication
      const validation = validateAdminOperation(
        userInfo,
        'toggle admin status',
      );
      if (!validation.isValid) {
        dispatch({
          type: ADMIN_IS_ADMIN_FAILURE,
          payload: validation.error,
        });
        return;
      }

      const config = createAuthConfig(userInfo);

      const { data } = await axios.put(
        buildAdminApiUrl('toggleAdmin', adminIsAdmin.id),
        { isAdmin: adminIsAdmin.toggledValue },
        config,
      );

      dispatch({ type: ADMIN_IS_ADMIN_SUCCESS, payload: data });
      dispatch(adminGetAllUserDetailsAction());
    } catch (error) {
      // Handle authentication/authorization errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch({
          type: ADMIN_IS_ADMIN_FAILURE,
          payload: 'Admin access denied. Please log in again.',
        });
        dispatch(logoutAction());
        return;
      }

      dispatch({
        type: ADMIN_IS_ADMIN_FAILURE,
        payload: handleAdminApiError(error),
      });
    }
  };
//PUT: ADMIN isSuspended toggle
export const adminIsSuspendedAction =
  (adminIsSuspended) => async (dispatch, getState) => {
    try {
      // Input validation
      if (!adminIsSuspended?.id) {
        dispatch({
          type: ADMIN_IS_SUSPENDED_FAILURE,
          payload: 'User ID is required for suspension toggle operation',
        });
        return;
      }

      if (typeof adminIsSuspended.toggledValue !== 'boolean') {
        dispatch({
          type: ADMIN_IS_SUSPENDED_FAILURE,
          payload: 'Invalid suspension status value',
        });
        return;
      }

      dispatch({
        type: ADMIN_IS_SUSPENDED_REQUEST,
      });

      const state = getState();
      const userInfo = getAuthenticatedUser(state);

      // Validate authentication
      const validation = validateAdminOperation(
        userInfo,
        'toggle suspension status',
      );
      if (!validation.isValid) {
        dispatch({
          type: ADMIN_IS_SUSPENDED_FAILURE,
          payload: validation.error,
        });
        return;
      }

      const config = createAuthConfig(userInfo);

      const { data } = await axios.put(
        buildAdminApiUrl('toggleSuspended', adminIsSuspended.id),
        { isSuspended: adminIsSuspended.toggledValue },
        config,
      );

      dispatch({ type: ADMIN_IS_SUSPENDED_SUCCESS, payload: data });
      dispatch(adminGetAllUserDetailsAction());
    } catch (error) {
      // Handle authentication/authorization errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch({
          type: ADMIN_IS_SUSPENDED_FAILURE,
          payload: 'Admin access denied. Please log in again.',
        });
        dispatch(logoutAction());
        return;
      }

      dispatch({
        type: ADMIN_IS_SUSPENDED_FAILURE,
        payload: handleAdminApiError(error),
      });
    }
  };

//DELETE: ADMIN delete all USER's data
export const adminDeleteAllUserDataAction =
  (id) => async (dispatch, getState) => {
    try {
      // Input validation for this critical operation
      if (!id) {
        dispatch({
          type: ADMIN_DELETE_ALL_USER_DATA_FAILURE,
          payload: 'User ID is required for deletion operation',
        });
        return;
      }

      // Additional validation for string IDs
      if (typeof id !== 'string' && typeof id !== 'number') {
        dispatch({
          type: ADMIN_DELETE_ALL_USER_DATA_FAILURE,
          payload: 'Invalid user ID format',
        });
        return;
      }

      dispatch({
        type: ADMIN_DELETE_ALL_USER_DATA_REQUEST,
      });

      const state = getState();
      const userInfo = getAuthenticatedUser(state);

      // Validate authentication for this critical operation
      const validation = validateAdminOperation(userInfo, 'delete user data');
      if (!validation.isValid) {
        dispatch({
          type: ADMIN_DELETE_ALL_USER_DATA_FAILURE,
          payload: validation.error,
        });
        return;
      }

      const config = createAuthConfig(userInfo);

      const { data } = await axios.delete(
        buildAdminApiUrl('deleteUserData', id),
        config,
      );

      dispatch({ type: ADMIN_DELETE_ALL_USER_DATA_SUCCESS, payload: data });
      dispatch(adminGetAllUserDetailsAction());
    } catch (error) {
      // Handle authentication/authorization errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch({
          type: ADMIN_DELETE_ALL_USER_DATA_FAILURE,
          payload: 'Admin access denied. Please log in again.',
        });
        dispatch(logoutAction());
        return;
      }

      // Handle specific error for delete operations
      if (error.response?.status === 404) {
        dispatch({
          type: ADMIN_DELETE_ALL_USER_DATA_FAILURE,
          payload: 'User data not found or already deleted',
        });
        return;
      }

      dispatch({
        type: ADMIN_DELETE_ALL_USER_DATA_FAILURE,
        payload: handleAdminApiError(error),
      });
    }
  };
