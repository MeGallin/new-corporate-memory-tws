import {
  AGENT_CHAT_REQUEST,
  AGENT_CHAT_SUCCESS,
  AGENT_CHAT_FAILURE,
  AGENT_CHAT_RESET,
} from '../constants/agentConstants';

const initialState = {
  loading: false,
  error: null,
  data: null, // { answerText, citations[], followUps[] }
};

export const agentChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGENT_CHAT_REQUEST:
      return { ...state, loading: true, error: null };
    case AGENT_CHAT_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case AGENT_CHAT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case AGENT_CHAT_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

