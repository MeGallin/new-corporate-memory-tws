import axios from 'axios';
import { buildApiUrl } from '../utils/api';
import { getAuthenticatedUser, createAuthConfig } from '../utils/auth';
import {
  MEMORY_IMAGE_DELETE_FAILURE,
  MEMORY_IMAGE_DELETE_REQUEST,
  MEMORY_IMAGE_DELETE_SUCCESS,
  MEMORY_IMAGE_UPLOAD_FAILURE,
  MEMORY_IMAGE_UPLOAD_REQUEST,
  MEMORY_IMAGE_UPLOAD_SUCCESS,
  USER_PROFILE_IMAGE_DELETE_FAILURE,
  USER_PROFILE_IMAGE_DELETE_REQUEST,
  USER_PROFILE_IMAGE_DELETE_SUCCESS,
  USER_PROFILE_IMAGE_UPLOAD_FAILURE,
  USER_PROFILE_IMAGE_UPLOAD_REQUEST,
  USER_PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/imageUploadConstants';

import { memoriesGetAction } from './memoriesActions';
import { userInfoDetailsAction } from './userActions';

export const userProfileImageUploadAction =
  (userId, formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PROFILE_IMAGE_UPLOAD_REQUEST,
      });

      const userInfo = getAuthenticatedUser(getState());
      if (!userInfo) {
        dispatch({
          type: USER_PROFILE_IMAGE_UPLOAD_FAILURE,
          payload: 'User not authenticated',
        });
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
          userId: userId,
        },
      };

      const { data } = await axios.post(
        buildApiUrl('userProfileUploadImage'),
        formData,
        config,
      );
      dispatch({ type: USER_PROFILE_IMAGE_UPLOAD_SUCCESS, payload: data });
      dispatch(userInfoDetailsAction());
    } catch (error) {
      dispatch({
        type: USER_PROFILE_IMAGE_UPLOAD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//USER Delete profile image
export const userProfileImageDeleteAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PROFILE_IMAGE_DELETE_REQUEST,
      });

      const userInfo = getAuthenticatedUser(getState());
      if (!userInfo) {
        dispatch({
          type: USER_PROFILE_IMAGE_DELETE_FAILURE,
          payload: 'User not authenticated',
        });
        return;
      }

      const config = createAuthConfig(userInfo);

      await axios.delete(
        buildApiUrl('userProfileDeleteImage', id),
        config,
      );
      dispatch({ type: USER_PROFILE_IMAGE_DELETE_SUCCESS });
      dispatch(userInfoDetailsAction());
    } catch (error) {
      dispatch({
        type: USER_PROFILE_IMAGE_DELETE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//Memories images
export const memoryImageUploadAction =
  (memoryId, formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMORY_IMAGE_UPLOAD_REQUEST,
      });

      const userInfo = getAuthenticatedUser(getState());
      if (!userInfo) {
        dispatch({
          type: MEMORY_IMAGE_UPLOAD_FAILURE,
          payload: 'User not authenticated',
        });
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
          memoryId: memoryId,
        },
      };

      const { data } = await axios.post(
        buildApiUrl('memoryUploadImage'),
        formData,
        config,
      );
      dispatch({
        type: MEMORY_IMAGE_UPLOAD_SUCCESS,
        payload: data,
      });
      // Update the state of the state
      dispatch(memoriesGetAction());
    } catch (error) {
      dispatch({
        type: MEMORY_IMAGE_UPLOAD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// MEMORYDelete an IMAGE
export const deleteMemoryImageAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORY_IMAGE_DELETE_REQUEST,
    });

    const userInfo = getAuthenticatedUser(getState());
    if (!userInfo) {
      dispatch({
        type: MEMORY_IMAGE_DELETE_FAILURE,
        payload: 'User not authenticated',
      });
      return;
    }

    const config = createAuthConfig(userInfo);

    await axios.delete(
      buildApiUrl('memories', id) + '/image',
      config,
    );
    dispatch({ type: MEMORY_IMAGE_DELETE_SUCCESS });
    dispatch(memoriesGetAction());
  } catch (error) {
    dispatch({
      type: MEMORY_IMAGE_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
