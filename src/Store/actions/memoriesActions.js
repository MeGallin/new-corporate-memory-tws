import axios from 'axios';
import {
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