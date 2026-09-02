import { describe, expect, it, vi } from 'vitest';

import { agentChatAction } from './agentActions';
import { contactFormAction } from './ContactFormActions';
import { registerAction } from './userActions';
import { AGENT_CHAT_FAILURE } from '../constants/agentConstants';
import { CONTACT_FORM_FAILURE } from '../constants/contactFormConstants';
import { USER_REGISTER_FAILURE } from '../constants/userConstants';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('form action validation', () => {
  it('rejects mismatched registration passwords before making a request', async () => {
    const dispatch = vi.fn();
    await registerAction({
      name: 'Admin Guy',
      email: 'admin@example.com',
      password: 'Secure1!',
      confirmPassword: 'Different1!',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_REGISTER_FAILURE,
      payload: 'Passwords do not match.',
    });
  });

  it('rejects a whitespace-only contact message before making a request', async () => {
    const dispatch = vi.fn();
    await contactFormAction({
      name: 'Admin Guy',
      email: 'admin@example.com',
      message: '         ',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: CONTACT_FORM_FAILURE,
      payload: 'Message must contain at least 9 characters.',
    });
  });

  it('rejects a whitespace-only Agent Chat question', async () => {
    const dispatch = vi.fn();
    const getState = () => ({
      userLogin: { userInfo: { token: 'test-token' } },
    });
    await agentChatAction({ question: '   ' })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: AGENT_CHAT_FAILURE,
      payload: 'Please provide a question to ask the agent.',
    });
  });
});
