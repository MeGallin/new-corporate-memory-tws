import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MemoriesComponent from './MemoriesComponent';

const testState = {
  userLogin: { userInfo: { token: 'test-token' } },
  googleUserLogin: { userInfo: null },
  userInfoDetails: {
    loading: false,
    error: null,
    userDetails: { isConfirmed: true },
  },
  memoriesGet: {
    loading: false,
    error: null,
    memories: [
      {
        _id: 'active-memory',
        title: 'Active memory',
        memory: 'Still active',
        isComplete: false,
      },
      {
        _id: 'completed-memory',
        title: 'Completed memory',
        memory: 'Already completed',
        isComplete: true,
      },
    ],
  },
  sortedMemories: { memories: [] },
};

const dispatch = vi.fn();
const defaultMemories = testState.memoriesGet.memories;
const defaultUserDetails = testState.userInfoDetails.userDetails;

vi.mock('react-redux', () => ({
  useDispatch: () => dispatch,
  useSelector: (selector) => selector(testState),
}));

vi.mock('../../Store/actions/memoriesActions', () => ({
  memoriesGetAction: () => ({ type: 'TEST_MEMORIES_GET' }),
}));

vi.mock('../../Store/actions/userActions', () => ({
  userInfoDetailsAction: () => ({ type: 'TEST_USER_DETAILS_GET' }),
}));

vi.mock('../Card/CardComponent', () => ({
  default: ({ memory }) => <div>{memory.title}</div>,
}));

vi.mock('../Search/SearchComponent', () => ({
  default: ({ ariaLabel, ...props }) => (
    <input aria-label={ariaLabel} {...props} />
  ),
}));

vi.mock('../Modal/ModalComponent', () => ({
  default: ({ isOpen, children }) => (isOpen ? <div>{children}</div> : null),
}));

vi.mock('../CreateMemory/CreateMemoryComponent', () => ({
  default: () => <div>Create memory form</div>,
}));

vi.mock('../Sort/SortComponent', () => ({
  default: () => <div>Sort memories</div>,
}));

vi.mock('../Button/ButtonComponent', () => ({
  default: ({ onClick, text, type }) => (
    <button type={type} onClick={onClick}>{text}</button>
  ),
}));

vi.mock('../AgentChat/AgentChatComponent', () => ({
  default: ({ actions }) => <div>Ask AI {actions}</div>,
}));

describe('MemoriesComponent', () => {
  beforeEach(() => {
    dispatch.mockClear();
    testState.memoriesGet.memories = defaultMemories;
    testState.userInfoDetails.userDetails = defaultUserDetails;
    testState.userInfoDetails.error = null;
  });

  test('keeps core search visible and advanced tools in a closed disclosure', () => {
    render(
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    const fineTuneFieldset = screen.getByText('Fine-tune results').closest('fieldset');
    const disclosure = fineTuneFieldset.querySelector('details');
    const summary = disclosure.querySelector('summary');

    expect(disclosure).toHaveProperty('open', false);
    expect(fineTuneFieldset).toHaveTextContent('Optional search tools');
    expect(
      disclosure.contains(
        screen.getByRole('textbox', { name: 'Search memory titles and notes' }),
      ),
    ).toBe(false);
    expect(disclosure.contains(screen.getByText('Memory status'))).toBe(false);
    expect(disclosure).toHaveTextContent('Sort memories');
    expect(disclosure).toHaveTextContent('Ask AI');

    fireEvent.click(summary);
    expect(disclosure).toHaveProperty('open', true);
  });

  test('links the completed-memory status to the user admin page', () => {
    render(
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
          <Route
            path="/user-admin"
            element={<h1>Completed memories destination</h1>}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole('link', {
        name: '1 completed memory. View completed memories.',
      }),
    );

    expect(
      screen.getByRole('heading', { name: 'Completed memories destination' }),
    ).toBeInTheDocument();
  });

  test('shows a non-interactive completed status when the count is zero', () => {
    const currentMemories = testState.memoriesGet.memories;
    testState.memoriesGet.memories = [currentMemories[0]];

    render(
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText((_, element) =>
        element?.classList.contains('memories-completed-status'),
      ),
    ).toHaveTextContent('0 completed');
    expect(
      screen.queryByRole('link', { name: /0 completed/i }),
    ).not.toBeInTheDocument();

    testState.memoriesGet.memories = currentMemories;
  });

  test('keeps account-level status totals while filtering visible memories', () => {
    testState.memoriesGet.memories = [
      ...defaultMemories,
      {
        _id: 'second-active-memory',
        title: 'Another active memory',
        memory: 'Not part of the search result',
        isComplete: false,
      },
    ];

    render(
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(
      screen.getByRole('textbox', { name: 'Search memory titles and notes' }),
      { target: { value: 'Still active' } },
    );

    expect(
      screen.getByRole('group', { name: 'Memory status' }),
    ).toHaveTextContent('2 active');
    expect(screen.getByText('Active memory')).toBeInTheDocument();
    expect(screen.queryByText('Another active memory')).not.toBeInTheDocument();
  });

  test('explains when all memories are complete', () => {
    const currentMemories = testState.memoriesGet.memories;
    testState.memoriesGet.memories = [currentMemories[1]];

    render(
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'No active memories' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View completed memories' }),
    ).toHaveAttribute('href', '/user-admin');

    testState.memoriesGet.memories = currentMemories;
  });

  test('explains when a search matches only completed memories', () => {
    render(
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(
      screen.getByRole('textbox', { name: 'Search memory titles and notes' }),
      { target: { value: 'Completed memory' } },
    );

    expect(
      screen.getByRole('heading', { name: 'Matching memories are completed' }),
    ).toBeInTheDocument();
  });

  test('loads account details before memories after a direct page refresh', () => {
    const currentUserDetails = testState.userInfoDetails.userDetails;
    const currentMemories = testState.memoriesGet.memories;
    testState.userInfoDetails.userDetails = undefined;
    testState.memoriesGet.memories = undefined;

    const memoriesRoute = () => (
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
        </Routes>
      </MemoryRouter>
    );
    const { rerender } = render(memoriesRoute());

    expect(dispatch).toHaveBeenCalledWith({ type: 'TEST_USER_DETAILS_GET' });
    expect(dispatch).not.toHaveBeenCalledWith({ type: 'TEST_MEMORIES_GET' });

    dispatch.mockClear();
    testState.userInfoDetails.userDetails = currentUserDetails;
    testState.memoriesGet.memories = currentMemories;
    rerender(memoriesRoute());

    expect(dispatch).toHaveBeenCalledWith({ type: 'TEST_MEMORIES_GET' });
  });

  test('offers an account-details retry instead of showing an empty memory state', () => {
    const currentUserDetails = testState.userInfoDetails.userDetails;
    const currentUserDetailsError = testState.userInfoDetails.error;
    const currentMemories = testState.memoriesGet.memories;
    testState.userInfoDetails.userDetails = undefined;
    testState.userInfoDetails.error = 'Account details unavailable';
    testState.memoriesGet.memories = undefined;

    render(
      <MemoryRouter initialEntries={['/memories']}>
        <Routes>
          <Route path="/memories" element={<MemoriesComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Error loading your account/)).toBeInTheDocument();
    expect(screen.queryByText('No memories yet!')).not.toBeInTheDocument();
    screen.getByRole('button', { name: 'Try Again' }).click();
    expect(dispatch).toHaveBeenCalledWith({ type: 'TEST_USER_DETAILS_GET' });

    testState.userInfoDetails.userDetails = currentUserDetails;
    testState.userInfoDetails.error = currentUserDetailsError;
    testState.memoriesGet.memories = currentMemories;
  });
});
