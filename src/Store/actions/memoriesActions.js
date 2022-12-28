import axios from 'axios';
import {
  MEMORIES_CREATE_FAILURE,
  MEMORIES_CREATE_REQUEST,
  MEMORIES_CREATE_SUCCESS,
  MEMORIES_DELETE_FAILURE,
  MEMORIES_DELETE_REQUEST,
  MEMORIES_DELETE_SUCCESS,
  MEMORIES_EDIT_FAILURE,
  MEMORIES_EDIT_REQUEST,
  MEMORIES_EDIT_SUCCESS,
  MEMORIES_GET_FAILURE,
  MEMORIES_GET_REQUEST,
  MEMORIES_GET_SUCCESS,
} from '../constants/memoriesConstants';

//GET: Memories
export const memoriesGetAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_GET_REQUEST,
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
      `${process.env.REACT_APP_END_POINT}api/memories`,
      config,
    );
    dispatch({ type: MEMORIES_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEMORIES_GET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//POST: Create a memory
export const memoryCreateAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_CREATE_REQUEST,
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

    const { data } = await axios.post(
      `${process.env.REACT_APP_END_POINT}api/create-memory`,
      formData,
      config,
    );
    dispatch({ type: MEMORIES_CREATE_SUCCESS, payload: data });
    dispatch(memoriesGetAction());
  } catch (error) {
    dispatch({
      type: MEMORIES_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//PUT: Edit a memory
export const memoryEditAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_EDIT_REQUEST,
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
      `${process.env.REACT_APP_END_POINT}api/edit-memory/${formData.id}`,
      formData,
      config,
    );
    dispatch({ type: MEMORIES_EDIT_SUCCESS, payload: data });
    dispatch(memoriesGetAction());
  } catch (error) {
    dispatch({
      type: MEMORIES_EDIT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Delete: Delete a memory
export const memoryDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_DELETE_REQUEST,
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

    const { data } = await axios.delete(
      `${process.env.REACT_APP_END_POINT}api/delete-memory/${id}`,
      config,
    );
    dispatch({ type: MEMORIES_DELETE_SUCCESS, payload: data });
    dispatch(memoriesGetAction());
  } catch (error) {
    dispatch({
      type: MEMORIES_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
