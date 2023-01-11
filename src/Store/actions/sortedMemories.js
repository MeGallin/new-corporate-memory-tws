import {
  SORTED_MEMORIES_REQUEST,
  SORTED_MEMORIES_SUCCESS,
} from '../constants/sortedMemories';

//GET: Memories
export const sortedMemoriesAction =
  (sortedMemories) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SORTED_MEMORIES_REQUEST,
      });

      dispatch({ type: SORTED_MEMORIES_SUCCESS, payload: sortedMemories });
    } catch (error) {
      console.log(error);
    }
  };
