import {
  MEMORIES_CREATE_FAILURE,
  MEMORIES_CREATE_REQUEST,
  MEMORIES_CREATE_SUCCESS,
  MEMORIES_GET_FAILURE,
  MEMORIES_GET_REQUEST,
  MEMORIES_GET_RESET,
  MEMORIES_GET_SUCCESS,
} from '../constants/memoriesConstants';

// GET: ADMIN get PLAYERS reducer
export const memoriesGetReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORIES_GET_REQUEST:
      return { loading: true };
    case MEMORIES_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        memories: action.payload,
      };
    case MEMORIES_GET_RESET:
      return {};
    case MEMORIES_GET_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// POST: Create a memory
export const memoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORIES_CREATE_REQUEST:
      return { loading: true };
    case MEMORIES_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORIES_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
