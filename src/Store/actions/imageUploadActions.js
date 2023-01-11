import axios from 'axios';
import {
  MEMORY_IMAGE_DELETE_FAILURE,
  MEMORY_IMAGE_DELETE_REQUEST,
  MEMORY_IMAGE_DELETE_SUCCESS,
  MEMORY_IMAGE_UPLOAD_FAILURE,
  MEMORY_IMAGE_UPLOAD_REQUEST,
  MEMORY_IMAGE_UPLOAD_SUCCESS,
  PROFILE_IMAGE_UPLOAD_FAILURE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/imageUploadConstants';

import { memoriesGetAction } from './memoriesActions';

export const profileImageUploadAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_REQUEST,
      });

      if (getState().userLogin.userInfo) {
        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(
          `/api/profileUpload`,
          formData,
          config,
        );
        dispatch({
          type: PROFILE_IMAGE_UPLOAD_SUCCESS,
          payload: data,
        });
      }

      if (getState().googleUserLogin.userInfo) {
        const {
          googleUserLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(
          `/api/profileUpload`,
          formData,
          config,
        );
        dispatch({
          type: PROFILE_IMAGE_UPLOAD_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_FAILURE,
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

      if (getState().userLogin.userInfo) {
        const {
          userLogin: { userInfo },
        } = getState();
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
            memoryId: memoryId,
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_END_POINT}api/memory-upload-image`,
          formData,
          config,
        );
        dispatch({
          type: MEMORY_IMAGE_UPLOAD_SUCCESS,
          payload: data,
        });
        // Update the state of the state
        dispatch(memoriesGetAction());
      }

      if (getState().googleUserLogin.userInfo) {
        const {
          googleUserLogin: { userInfo },
        } = getState();
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
            memoryId: memoryId,
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_END_POINT}api/memory-upload-image`,
          formData,
          config,
        );
        dispatch({
          type: MEMORY_IMAGE_UPLOAD_SUCCESS,
          payload: data,
        });
        // Update the state of the state
        dispatch(memoriesGetAction());
      }
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

    if (getState().userLogin.userInfo) {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_END_POINT}api/delete-memory-image/${id}`,
        config,
      );
      dispatch({ type: MEMORY_IMAGE_DELETE_SUCCESS });
      dispatch(memoriesGetAction());
    }

    if (getState().googleUserLogin.userInfo) {
      const {
        googleUserLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_END_POINT}api/delete-memory-image/${id}`,
        config,
      );
      dispatch({ type: MEMORY_IMAGE_DELETE_SUCCESS });
      dispatch(memoriesGetAction());
    }
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
