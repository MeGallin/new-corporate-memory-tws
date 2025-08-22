import axios from 'axios';
import { buildApiUrl } from '../utils/api';
import {
  PAGE_HITS_FAILURE,
  PAGE_HITS_REQUEST,
  PAGE_HITS_SUCCESS,
} from '../constants/pageHitCounterConstants';

//GET: User get ip and login hits of user
export const pageHitsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PAGE_HITS_REQUEST,
    });

    const { data } = await axios.get(
      buildApiUrl('pageHits'),
    );
    dispatch({ type: PAGE_HITS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAGE_HITS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
