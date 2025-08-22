import axios from 'axios';

import { SORTED_MEMORIES_SUCCESS } from '../constants/sortedMemories';

import {
  MEMORIES_CREATE_FAILURE,
  MEMORIES_CREATE_REQUEST,
  MEMORIES_CREATE_SUCCESS,
  MEMORIES_DELETE_FAILURE,
  MEMORIES_DELETE_REQUEST,
  MEMORIES_DELETE_SUCCESS,
  MEMORIES_DELETE_TAG_FAILURE,
  MEMORIES_DELETE_TAG_REQUEST,
  MEMORIES_DELETE_TAG_SUCCESS,
  MEMORIES_EDIT_FAILURE,
  MEMORIES_EDIT_REQUEST,
  MEMORIES_EDIT_SUCCESS,
  MEMORIES_GET_FAILURE,
  MEMORIES_GET_REQUEST,
  MEMORIES_GET_SUCCESS,
  MEMORIES_IS_COMPETE_FAILURE,
  MEMORIES_IS_COMPETE_REQUEST,
  MEMORIES_IS_COMPETE_SUCCESS,
  MEMORIES_SET_DUE_DATE_FAILURE,
  MEMORIES_SET_DUE_DATE_REQUEST,
  MEMORIES_SET_DUE_DATE_SUCCESS,
} from '../constants/memoriesConstants';

// Import logout action for session management
import { logoutAction } from './userActions';

// API configuration for memory endpoints
const MEMORIES_API_CONFIG = {
  baseURL: process.env.REACT_APP_END_POINT,
  endpoints: {
    memories: 'api/memories',
    createMemory: 'api/create-memory',
    editMemory: 'api/edit-memory',
    deleteMemory: 'api/delete-memory',
    deleteMemoryTag: 'api/delete-memory-tag',
  },
};

const buildMemoriesApiUrl = (endpoint, param = '') => {
  const url = `${MEMORIES_API_CONFIG.baseURL}${MEMORIES_API_CONFIG.endpoints[endpoint]}`;
  return param ? `${url}/${param}` : url;
};

// Utility function to validate date
const isValidDate = (dateString) => {
  if (!dateString) return true; // Allow null/empty dates

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) && dateString !== '';
};

// Utility function to get authenticated user from state
const getAuthenticatedUser = (state) => {
  if (state.userLogin?.userInfo) {
    return state.userLogin.userInfo;
  }

  if (state.googleUserLogin?.userInfo) {
    return state.googleUserLogin.userInfo;
  }

  return null;
};

// Utility function to create auth headers
const createAuthConfig = (userInfo) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`,
  },
});

// Utility function to handle API errors consistently
const handleMemoriesApiError = (error) => {
  let errorMessage = 'An unexpected error occurred';

  if (error.response) {
    errorMessage =
      error.response.data?.message || `Server Error: ${error.response.status}`;
  } else if (error.request) {
    errorMessage = 'Network error. Please check your connection.';
  } else {
    errorMessage = error.message;
  }

  console.error('Memories API Error:', { error, errorMessage });
  return errorMessage;
};

// Utility function to validate memory operations
const validateMemoryOperation = (
  userInfo,
  data = null,
  operationType = 'memory operation',
) => {
  if (!userInfo) {
    return { isValid: false, error: 'User not authenticated' };
  }

  // Validate memory data for operations that require it
  if (
    data &&
    (operationType.includes('create') || operationType.includes('edit'))
  ) {
    if (!data.title || data.title.trim().length === 0) {
      return { isValid: false, error: 'Memory title is required' };
    }

    if (!data.memory || data.memory.trim().length === 0) {
      return { isValid: false, error: 'Memory content is required' };
    }
  }

  return { isValid: true };
};

// Utility function to validate IDs
const validateId = (id, operationType = 'operation') => {
  if (!id) {
    return { isValid: false, error: `ID is required for ${operationType}` };
  }

  if (typeof id !== 'string' && typeof id !== 'number') {
    return { isValid: false, error: 'Invalid ID format' };
  }

  return { isValid: true };
};

//GET: Memories
export const memoriesGetAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_GET_REQUEST,
    });

    const state = getState();
    const userInfo = getAuthenticatedUser(state);

    // Validate authentication
    const validation = validateMemoryOperation(userInfo, null, 'get memories');
    if (!validation.isValid) {
      dispatch({
        type: MEMORIES_GET_FAILURE,
        payload: validation.error,
      });
      return;
    }

    const config = createAuthConfig(userInfo);

    const { data } = await axios.get(buildMemoriesApiUrl('memories'), config);

    dispatch({ type: MEMORIES_GET_SUCCESS, payload: data });
    dispatch({ type: SORTED_MEMORIES_SUCCESS, payload: data });
  } catch (error) {
    // Handle 401/403 errors - authentication/authorization issues
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch({
        type: MEMORIES_GET_FAILURE,
        payload: 'Session expired. Please log in again.',
      });
      dispatch(logoutAction());
      return;
    }

    dispatch({
      type: MEMORIES_GET_FAILURE,
      payload: handleMemoriesApiError(error),
    });
  }
};

//POST: Create a memory
export const memoryCreateAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_CREATE_REQUEST,
    });

    const state = getState();
    const userInfo = getAuthenticatedUser(state);

    // Validate authentication and form data
    const validation = validateMemoryOperation(
      userInfo,
      formData,
      'create memory',
    );
    if (!validation.isValid) {
      dispatch({
        type: MEMORIES_CREATE_FAILURE,
        payload: validation.error,
      });
      return;
    }

    const config = createAuthConfig(userInfo);

    const { data } = await axios.post(
      buildMemoriesApiUrl('createMemory'),
      formData,
      config,
    );

    dispatch({ type: MEMORIES_CREATE_SUCCESS, payload: data });
    dispatch(memoriesGetAction());
  } catch (error) {
    // Handle authentication/authorization errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch({
        type: MEMORIES_CREATE_FAILURE,
        payload: 'Session expired. Please log in again.',
      });
      dispatch(logoutAction());
      return;
    }

    dispatch({
      type: MEMORIES_CREATE_FAILURE,
      payload: handleMemoriesApiError(error),
    });
  }
};

//PUT: Edit a memory
export const memoryEditAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_EDIT_REQUEST,
    });

    const state = getState();
    const userInfo = getAuthenticatedUser(state);

    // Validate authentication and form data
    const validation = validateMemoryOperation(
      userInfo,
      formData,
      'edit memory',
    );
    if (!validation.isValid) {
      dispatch({
        type: MEMORIES_EDIT_FAILURE,
        payload: validation.error,
      });
      return;
    }

    // Validate memory ID
    const idValidation = validateId(formData.id, 'memory edit');
    if (!idValidation.isValid) {
      dispatch({
        type: MEMORIES_EDIT_FAILURE,
        payload: idValidation.error,
      });
      return;
    }

    const config = createAuthConfig(userInfo);

    const { data } = await axios.put(
      buildMemoriesApiUrl('editMemory', formData.id),
      formData,
      config,
    );

    dispatch({ type: MEMORIES_EDIT_SUCCESS, payload: data });
    dispatch(memoriesGetAction());
  } catch (error) {
    // Handle authentication/authorization errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch({
        type: MEMORIES_EDIT_FAILURE,
        payload: 'Session expired. Please log in again.',
      });
      dispatch(logoutAction());
      return;
    }

    // Handle not found errors
    if (error.response?.status === 404) {
      dispatch({
        type: MEMORIES_EDIT_FAILURE,
        payload: 'Memory not found or you do not have permission to edit it.',
      });
      return;
    }

    dispatch({
      type: MEMORIES_EDIT_FAILURE,
      payload: handleMemoriesApiError(error),
    });
  }
};

//Delete: Delete a memory
export const memoryDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_DELETE_REQUEST,
    });

    const state = getState();
    const userInfo = getAuthenticatedUser(state);

    // Validate authentication
    const validation = validateMemoryOperation(userInfo, null, 'delete memory');
    if (!validation.isValid) {
      dispatch({
        type: MEMORIES_DELETE_FAILURE,
        payload: validation.error,
      });
      return;
    }

    // Validate memory ID
    const idValidation = validateId(id, 'memory deletion');
    if (!idValidation.isValid) {
      dispatch({
        type: MEMORIES_DELETE_FAILURE,
        payload: idValidation.error,
      });
      return;
    }

    const config = createAuthConfig(userInfo);

    const { data } = await axios.delete(
      buildMemoriesApiUrl('deleteMemory', id),
      config,
    );

    dispatch({ type: MEMORIES_DELETE_SUCCESS, payload: data });
    dispatch(memoriesGetAction());
  } catch (error) {
    // Handle authentication/authorization errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch({
        type: MEMORIES_DELETE_FAILURE,
        payload: 'Session expired. Please log in again.',
      });
      dispatch(logoutAction());
      return;
    }

    // Handle not found errors
    if (error.response?.status === 404) {
      dispatch({
        type: MEMORIES_DELETE_FAILURE,
        payload: 'Memory not found or already deleted.',
      });
      return;
    }

    dispatch({
      type: MEMORIES_DELETE_FAILURE,
      payload: handleMemoriesApiError(error),
    });
  }
};

//Delete Tag: Delete a memory tag
export const memoryDeleteTagAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMORIES_DELETE_TAG_REQUEST,
    });

    const state = getState();
    const userInfo = getAuthenticatedUser(state);

    // Validate authentication
    const validation = validateMemoryOperation(
      userInfo,
      null,
      'delete memory tag',
    );
    if (!validation.isValid) {
      dispatch({
        type: MEMORIES_DELETE_TAG_FAILURE,
        payload: validation.error,
      });
      return;
    }

    // Validate memory ID
    const idValidation = validateId(id, 'memory tag deletion');
    if (!idValidation.isValid) {
      dispatch({
        type: MEMORIES_DELETE_TAG_FAILURE,
        payload: idValidation.error,
      });
      return;
    }

    const config = createAuthConfig(userInfo);

    const { data } = await axios.delete(
      buildMemoriesApiUrl('deleteMemoryTag', id),
      config,
    );

    dispatch({ type: MEMORIES_DELETE_TAG_SUCCESS, payload: data });
    dispatch(memoriesGetAction());
  } catch (error) {
    // Handle authentication/authorization errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch({
        type: MEMORIES_DELETE_TAG_FAILURE,
        payload: 'Session expired. Please log in again.',
      });
      dispatch(logoutAction());
      return;
    }

    // Handle not found errors
    if (error.response?.status === 404) {
      dispatch({
        type: MEMORIES_DELETE_TAG_FAILURE,
        payload: 'Memory not found or tag does not exist.',
      });
      return;
    }

    dispatch({
      type: MEMORIES_DELETE_TAG_FAILURE,
      payload: handleMemoriesApiError(error),
    });
  }
};

//PUT: Set due date for a memory
export const memorySetDueDateAction =
  (memoryData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMORIES_SET_DUE_DATE_REQUEST,
      });

      const state = getState();
      const userInfo = getAuthenticatedUser(state);

      // Validate authentication
      const validation = validateMemoryOperation(
        userInfo,
        null,
        'set memory due date',
      );
      if (!validation.isValid) {
        dispatch({
          type: MEMORIES_SET_DUE_DATE_FAILURE,
          payload: validation.error,
        });
        return;
      }

      // Validate memory data
      if (!memoryData || !memoryData.id) {
        dispatch({
          type: MEMORIES_SET_DUE_DATE_FAILURE,
          payload: 'Memory ID is required to set due date.',
        });
        return;
      }

      // Validate memory ID
      const idValidation = validateId(memoryData.id, 'due date setting');
      if (!idValidation.isValid) {
        dispatch({
          type: MEMORIES_SET_DUE_DATE_FAILURE,
          payload: idValidation.error,
        });
        return;
      }

      // Validate due date if provided
      if (memoryData.setDueDate && !isValidDate(memoryData.setDueDate)) {
        dispatch({
          type: MEMORIES_SET_DUE_DATE_FAILURE,
          payload: 'Invalid due date format. Please provide a valid date.',
        });
        return;
      }

      const config = createAuthConfig(userInfo);

      const requestBody = {
        setDueDate: memoryData.setDueDate,
      };

      const { data } = await axios.put(
        buildMemoriesApiUrl('editMemory', memoryData.id),
        requestBody,
        config,
      );

      dispatch({ type: MEMORIES_SET_DUE_DATE_SUCCESS, payload: data });
      dispatch(memoriesGetAction());
    } catch (error) {
      // Handle authentication/authorization errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch({
          type: MEMORIES_SET_DUE_DATE_FAILURE,
          payload: 'Session expired. Please log in again.',
        });
        dispatch(logoutAction());
        return;
      }

      // Handle not found errors
      if (error.response?.status === 404) {
        dispatch({
          type: MEMORIES_SET_DUE_DATE_FAILURE,
          payload: 'Memory not found or you do not have permission to edit it.',
        });
        return;
      }

      dispatch({
        type: MEMORIES_SET_DUE_DATE_FAILURE,
        payload: handleMemoriesApiError(error),
      });
    }
  };

//PUT: Set completion status for a memory
export const memoryIsCompleteAction =
  (memoryData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMORIES_IS_COMPETE_REQUEST,
      });

      const state = getState();
      const userInfo = getAuthenticatedUser(state);

      // Validate authentication
      const validation = validateMemoryOperation(
        userInfo,
        null,
        'update memory completion status',
      );
      if (!validation.isValid) {
        dispatch({
          type: MEMORIES_IS_COMPETE_FAILURE,
          payload: validation.error,
        });
        return;
      }

      // Validate memory data
      if (!memoryData || !memoryData.id) {
        dispatch({
          type: MEMORIES_IS_COMPETE_FAILURE,
          payload: 'Memory ID is required to update completion status.',
        });
        return;
      }

      // Validate memory ID
      const idValidation = validateId(
        memoryData.id,
        'completion status update',
      );
      if (!idValidation.isValid) {
        dispatch({
          type: MEMORIES_IS_COMPETE_FAILURE,
          payload: idValidation.error,
        });
        return;
      }

      // Validate completion status
      if (typeof memoryData.isComplete !== 'boolean') {
        dispatch({
          type: MEMORIES_IS_COMPETE_FAILURE,
          payload: 'Completion status must be a boolean value (true or false).',
        });
        return;
      }

      const config = createAuthConfig(userInfo);

      const requestBody = {
        isComplete: memoryData.isComplete,
      };

      const { data } = await axios.put(
        buildMemoriesApiUrl('editMemory', memoryData.id),
        requestBody,
        config,
      );

      dispatch({ type: MEMORIES_IS_COMPETE_SUCCESS, payload: data });
      dispatch(memoriesGetAction());
    } catch (error) {
      // Handle authentication/authorization errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch({
          type: MEMORIES_IS_COMPETE_FAILURE,
          payload: 'Session expired. Please log in again.',
        });
        dispatch(logoutAction());
        return;
      }

      // Handle not found errors
      if (error.response?.status === 404) {
        dispatch({
          type: MEMORIES_IS_COMPETE_FAILURE,
          payload: 'Memory not found or you do not have permission to edit it.',
        });
        return;
      }

      dispatch({
        type: MEMORIES_IS_COMPETE_FAILURE,
        payload: handleMemoriesApiError(error),
      });
    }
  };
