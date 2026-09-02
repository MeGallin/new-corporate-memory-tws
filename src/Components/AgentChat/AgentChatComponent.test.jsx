import { render, screen } from '@testing-library/react';
import AgentChatComponent from './AgentChatComponent';

const testState = {
  agentChat: {
    loading: false,
    error: null,
    data: {
      answerText: 'The quarterly plan is due Friday [M-memory-1].',
      citations: [
        { id: 'memory-1', title: 'Quarterly plan', score: 0.92 },
        { id: 'memory-2', title: 'Unreferenced note', score: 0.63 },
      ],
      followUps: [],
    },
  },
  userLogin: { userInfo: { token: 'test-token' } },
  googleUserLogin: { userInfo: null },
};

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector) => selector(testState),
}));

vi.mock('../../Store/actions/agentActions', () => ({
  agentChatAction: (payload) => ({ type: 'TEST_AGENT_CHAT', payload }),
}));

describe('AgentChatComponent', () => {
  test('links inline references to the returned memory metadata', () => {
    render(<AgentChatComponent />);

    expect(
      screen.getByRole('group', { name: 'Referenced memories' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Quarterly plan')).toBeInTheDocument();
    expect(screen.getByText('Ranking score 0.92')).toBeInTheDocument();
    expect(screen.queryByText('Unreferenced note')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Source 1' })).toHaveAttribute(
      'href',
      '#agent-chat-source-1',
    );
  });
});
