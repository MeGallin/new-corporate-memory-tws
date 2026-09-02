import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';

const testState = {
  userLogin: { userInfo: { token: 'test-token' } },
  googleUserLogin: { userInfo: null },
  userInfoDetails: {
    loading: false,
    error: null,
    userDetails: {
      _id: 'user-1',
      name: 'Test User',
      profileImage: '',
      ipAddress: '::1',
      loginCounter: 12,
      isAdmin: true,
      isConfirmed: true,
      isSuspended: false,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  },
  userEditDetails: { loading: false, success: false, error: null },
  memoriesGet: {
    memories: [
      { _id: 'active-1', title: 'Active memory', isComplete: false },
      { _id: 'complete-1', title: 'Completed memory', isComplete: true },
    ],
  },
};

const dispatch = vi.fn();

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

vi.mock('../Admin/AdminComponent', () => ({
  default: () => <label>Choose an account<select /></label>,
}));

vi.mock('./EditDetails/EditDetailsComponent', () => ({
  default: () => <fieldset><legend>Edit Details</legend></fieldset>,
}));

vi.mock('../UserProfileImages/UserProfileImageComponent', () => ({
  default: ({ altText }) => <img alt={altText} />,
}));

vi.mock('../Card/CardComponent', () => ({
  default: ({ memory }) => <article>{memory.title}</article>,
}));

describe('DashboardComponent', () => {
  beforeEach(() => {
    dispatch.mockClear();
  });

  test('presents account and completed-memory information in workspace sections', () => {
    render(
      <MemoryRouter>
        <DashboardComponent />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Dashboard workspace' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'User administration' }),
    ).toBeInTheDocument();

    const account = screen.getByRole('region', { name: 'Account overview' });
    expect(
      within(account).getByRole('group', { name: 'Admin Profile Image' }),
    ).toBeInTheDocument();
    expect(
      within(account).getByRole('group', { name: 'Edit Details' }),
    ).toBeInTheDocument();
    expect(within(account).getByText('LOCALHOST')).toBeInTheDocument();
    expect(within(account).getByText('Administrator')).toBeInTheDocument();
    expect(within(account).getAllByText('Yes')).toHaveLength(2);

    const completed = screen.getByRole('region', {
      name: 'Completed memories',
    });
    expect(within(completed).getByText('1 completed')).toBeInTheDocument();
    expect(within(completed).getByText('Completed memory')).toBeInTheDocument();
  });

  test('loads account details when the dashboard is opened directly', () => {
    const currentUserDetails = testState.userInfoDetails.userDetails;
    testState.userInfoDetails.userDetails = undefined;

    render(
      <MemoryRouter>
        <DashboardComponent />
      </MemoryRouter>,
    );

    expect(dispatch).toHaveBeenCalledWith({ type: 'TEST_USER_DETAILS_GET' });
    testState.userInfoDetails.userDetails = currentUserDetails;
  });

  test('hides the completed-memory section when there are no completed memories', () => {
    const currentMemories = testState.memoriesGet.memories;
    testState.memoriesGet.memories = currentMemories.filter(
      (memory) => !memory.isComplete,
    );

    try {
      render(
        <MemoryRouter>
          <DashboardComponent />
        </MemoryRouter>,
      );

      expect(
        screen.queryByRole('region', { name: 'Completed memories' }),
      ).not.toBeInTheDocument();
    } finally {
      testState.memoriesGet.memories = currentMemories;
    }
  });
});
