import {
  MEMORY_IMAGE_DELETE_FAILURE,
  MEMORY_IMAGE_DELETE_REQUEST,
  MEMORY_IMAGE_DELETE_RESET,
  MEMORY_IMAGE_DELETE_SUCCESS,
  MEMORY_IMAGE_UPLOAD_FAILURE,
  MEMORY_IMAGE_UPLOAD_REQUEST,
  MEMORY_IMAGE_UPLOAD_RESET,
  MEMORY_IMAGE_UPLOAD_SUCCESS,
  USER_PROFILE_IMAGE_DELETE_FAILURE,
  USER_PROFILE_IMAGE_DELETE_REQUEST,
  USER_PROFILE_IMAGE_DELETE_RESET,
  USER_PROFILE_IMAGE_DELETE_SUCCESS,
  USER_PROFILE_IMAGE_UPLOAD_FAILURE,
  USER_PROFILE_IMAGE_UPLOAD_REQUEST,
  USER_PROFILE_IMAGE_UPLOAD_RESET,
  USER_PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/imageUploadConstants';

// User profile images
export const userProfileImageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profileImageUploaded: action.payload,
      };
    case USER_PROFILE_IMAGE_UPLOAD_RESET:
      return {};
    case USER_PROFILE_IMAGE_UPLOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//User Profiles Image Delete
export const userProfileImageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case USER_PROFILE_IMAGE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case USER_PROFILE_IMAGE_DELETE_RESET:
      return {};
    case USER_PROFILE_IMAGE_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
// USER profile images

//Memories images
export const memoryImageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORY_IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case MEMORY_IMAGE_UPLOAD_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORY_IMAGE_UPLOAD_RESET:
      return {};
    case MEMORY_IMAGE_UPLOAD_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

//Memories Image Delete
export const memoryDeleteImageReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMORY_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case MEMORY_IMAGE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case MEMORY_IMAGE_DELETE_RESET:
      return {};
    case MEMORY_IMAGE_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
