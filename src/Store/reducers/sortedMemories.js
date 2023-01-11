import {
  SORTED_MEMORIES_REQUEST,
  SORTED_MEMORIES_RESET,
  SORTED_MEMORIES_SUCCESS,
} from '../constants/sortedMemories';

//Reset Password
export const sortedMemoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case SORTED_MEMORIES_REQUEST:
      return { loading: true };
    case SORTED_MEMORIES_SUCCESS:
      return {
        loading: false,
        success: true,
        memories: action.payload,
      };
    case SORTED_MEMORIES_RESET:
      return {};

    default:
      return { ...state };
  }
};
