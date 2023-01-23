import {
  PAGE_HITS_FAILURE,
  PAGE_HITS_REQUEST,
  PAGE_HITS_SUCCESS,
} from '../constants/pageHitCounterConstants';

//GET: PAGE HITS
export const pageHitsReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_HITS_REQUEST:
      return { loading: true };
    case PAGE_HITS_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case PAGE_HITS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
