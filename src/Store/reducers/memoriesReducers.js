import {
  MEMORIES_CREATE_FAILURE,
  MEMORIES_CREATE_REQUEST,
  MEMORIES_CREATE_RESET,
  MEMORIES_CREATE_SUCCESS,
  MEMORIES_DELETE_FAILURE,
  MEMORIES_DELETE_REQUEST,
  MEMORIES_DELETE_RESET,
  MEMORIES_DELETE_SUCCESS,
  MEMORIES_DELETE_TAG_FAILURE,
  MEMORIES_DELETE_TAG_REQUEST,
  MEMORIES_DELETE_TAG_RESET,
  MEMORIES_DELETE_TAG_SUCCESS,
  MEMORIES_EDIT_FAILURE,
  MEMORIES_EDIT_REQUEST,
  MEMORIES_EDIT_RESET,
  MEMORIES_EDIT_SUCCESS,
  MEMORIES_GET_FAILURE,
  MEMORIES_GET_REQUEST,
  MEMORIES_GET_RESET,
  MEMORIES_GET_SUCCESS,
  MEMORIES_IS_COMPETE_FAILURE,
  MEMORIES_IS_COMPETE_REQUEST,
  MEMORIES_IS_COMPETE_RESET,
  MEMORIES_IS_COMPETE_SUCCESS,
  MEMORIES_SET_DUE_DATE_FAILURE,
  MEMORIES_SET_DUE_DATE_REQUEST,
  MEMORIES_SET_DUE_DATE_RESET,
  MEMORIES_SET_DUE_DATE_SUCCESS,
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
        ...action.payload,
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
    case MEMORIES_CREATE_RESET:
      return {};
    case MEMORIES_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// PUT: Edit a memory
export const memoryEditReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORIES_EDIT_REQUEST:
      return { loading: true };
    case MEMORIES_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORIES_EDIT_RESET:
      return {};
    case MEMORIES_EDIT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// DELETE: Delete a memory
export const memoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORIES_DELETE_REQUEST:
      return { loading: true };
    case MEMORIES_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORIES_DELETE_RESET:
      return {};
    case MEMORIES_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// DELETE: Delete a memory TAG
export const memoryDeleteTagReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORIES_DELETE_TAG_REQUEST:
      return { loading: true };
    case MEMORIES_DELETE_TAG_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORIES_DELETE_TAG_RESET:
      return {};
    case MEMORIES_DELETE_TAG_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// PUT: SET DUE DATE in memory
export const memorySetDueDateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORIES_SET_DUE_DATE_REQUEST:
      return { loading: true };
    case MEMORIES_SET_DUE_DATE_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORIES_SET_DUE_DATE_RESET:
      return {};
    case MEMORIES_SET_DUE_DATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

// PUT: Is complete in memory
export const memoryIsCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORIES_IS_COMPETE_REQUEST:
      return { loading: true };
    case MEMORIES_IS_COMPETE_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORIES_IS_COMPETE_RESET:
      return {};
    case MEMORIES_IS_COMPETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
