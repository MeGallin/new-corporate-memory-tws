import axios from 'axios';
import { buildApiUrl } from '../utils/api';
import { getAuthenticatedUser, createAuthConfig } from '../utils/auth';
import { logoutAction } from './userActions';
import { getApiErrorMessage } from '../utils/errors';

import {
  AGENT_CHAT_REQUEST,
  AGENT_CHAT_SUCCESS,
  AGENT_CHAT_FAILURE,
} from '../constants/agentConstants';

export const agentChatAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: AGENT_CHAT_REQUEST });

    const state = getState();
    const userInfo = getAuthenticatedUser(state);
    if (!userInfo) {
      dispatch({
        type: AGENT_CHAT_FAILURE,
        payload: 'User not authenticated',
      });
      return;
    }

    const config = createAuthConfig(userInfo);

    const body = {
      question: payload?.question,
      ...(payload?.filters ? { filters: payload.filters } : {}),
    };

    if (
      !body.question ||
      typeof body.question !== 'string' ||
      !body.question.trim()
    ) {
      dispatch({
        type: AGENT_CHAT_FAILURE,
        payload: 'Please provide a question to ask the agent.',
      });
      return;
    }
    if (body.question.trim().length > 500) {
      dispatch({
        type: AGENT_CHAT_FAILURE,
        payload: 'Questions must be 500 characters or fewer.',
      });
      return;
    }

    body.question = body.question.trim();

    const { data } = await axios.post(
      buildApiUrl('agentMemoriesChat'),
      body,
      config,
    );

    dispatch({ type: AGENT_CHAT_SUCCESS, payload: data });
  } catch (error) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      dispatch({ type: AGENT_CHAT_FAILURE, payload: 'Session expired. Please log in again.' });
      dispatch(logoutAction());
      return;
    }
    dispatch({
      type: AGENT_CHAT_FAILURE,
      payload: getApiErrorMessage(error),
    });
  }
};
