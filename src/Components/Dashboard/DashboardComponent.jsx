import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import moment from 'moment';
import './DashboardComponent.scss';

import { memoriesGetAction } from '../../Store/actions/memoriesActions';
import { userInfoDetailsAction } from '../../Store/actions/userActions';
import { USER_EDIT_DETAILS_RESET } from '../../Store/constants/userConstants';

import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import CardComponent from '../Card/CardComponent';
import EditDetailsComponent from './EditDetails/EditDetailsComponent';
import AdminComponent from '../Admin/AdminComponent';
import UserProfileImageComponent from '../UserProfileImages/UserProfileImageComponent';

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: googleUserInfo } = useSelector(
    (state) => state.googleUserLogin,
  );
  const {
    loading: userDetailsLoading,
    error: userDetailsError,
    userDetails,
  } = useSelector((state) => state.userInfoDetails);
  const { loading, success, error } = useSelector((state) => state.userEditDetails);
  const { memories } = useSelector((state) => state.memoriesGet);
  const isAuthenticated = Boolean(userInfo || googleUserInfo);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/forms');
      return;
    }
    if (!userDetails) {
      dispatch(userInfoDetailsAction());
    } else if (!userDetails.isConfirmed) {
      navigate('/forms');
    }
    if (!memories) {
      dispatch(memoriesGetAction());
    }
  }, [isAuthenticated, userDetails, navigate, memories, dispatch]);

  const completedMemories = useMemo(() => {
    return memories?.filter((memory) => memory.isComplete) || [];
  }, [memories]);

  const activeMemoriesCount = Math.max(
    (memories?.length || 0) - completedMemories.length,
    0,
  );

  const renderAccountStatus = (label, isEnabled) => (
    <div className="dashboard-status-item">
      <span className="dashboard-status-icon" aria-hidden="true">
        {isEnabled ? <FaRegThumbsUp /> : <FaRegThumbsDown />}
      </span>
      <span>
        <span className="details-label">{label}</span>
        <strong>{isEnabled ? 'Yes' : 'No'}</strong>
      </span>
    </div>
  );

  return (
    <>
      {error && <ErrorComponent error={error} />}
      {userDetailsError && <ErrorComponent error={userDetailsError} />}
      {success && (
        <SuccessComponent
          message="Your details have been successfully updated."
          onClose={() => dispatch({ type: USER_EDIT_DETAILS_RESET })}
        />
      )}

      {loading || (isAuthenticated && userDetailsLoading && !userDetails) ? (
        <SpinnerComponent />
      ) : (
        <main className="dashboard-wrapper">
          <section className="dashboard-workbench" aria-labelledby="dashboard-title">
            <header className="dashboard-workbench__header">
              <div>
                <span>Account and memory administration</span>
                <h1 id="dashboard-title">Dashboard workspace</h1>
              </div>
              {userDetails && <strong>{userDetails.name}</strong>}
            </header>

            {userDetails?.isAdmin && (
              <fieldset className="query-fieldset dashboard-admin-panel">
                <legend>User administration</legend>
                <AdminComponent />
              </fieldset>
            )}
          </section>

          {userDetails && (
            <section className="dashboard-account" aria-labelledby="account-title">
              <header className="dashboard-section-header">
                <h2 id="account-title">Account overview</h2>
                <span>Profile and activity</span>
              </header>

              <div className="dashboard-account-grid">
                <fieldset className="query-fieldset dashboard-profile-panel">
                  <legend>Admin Profile Image</legend>
                  <UserProfileImageComponent
                    id={userDetails._id}
                    imgSrc={userDetails.profileImage}
                    altText={userDetails.name}
                  />
                </fieldset>

                <div className="dashboard-account-content">
                  <EditDetailsComponent />

                  <div className="dashboard-information-grid">
                    <fieldset className="query-fieldset dashboard-memory-status">
                      <legend>Memory status</legend>
                      <div className="dashboard-metrics">
                        <div>
                          <strong>{activeMemoriesCount}</strong>
                          <span>Active</span>
                        </div>
                        <div>
                          <strong>{completedMemories.length}</strong>
                          <span>Completed</span>
                        </div>
                        <div>
                          <strong>{memories?.length || 0}</strong>
                          <span>Total</span>
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="query-fieldset dashboard-account-details">
                      <legend>Account details</legend>
                      <dl>
                        <div>
                          <dt>Account ID</dt>
                          <dd>{userDetails._id}</dd>
                        </div>
                        <div>
                          <dt>Current IP address</dt>
                          <dd>
                            {userDetails.ipAddress === '::1'
                              ? 'LOCALHOST'
                              : userDetails.ipAddress}
                          </dd>
                        </div>
                        <div>
                          <dt>Login count</dt>
                          <dd>{userDetails.loginCounter}</dd>
                        </div>
                      </dl>
                    </fieldset>
                  </div>

                  <fieldset className="query-fieldset dashboard-account-status">
                    <legend>Account status</legend>
                    <div className="dashboard-status-grid">
                      {renderAccountStatus('Administrator', userDetails.isAdmin)}
                      {renderAccountStatus('Confirmed', userDetails.isConfirmed)}
                      {renderAccountStatus('Suspended', userDetails.isSuspended)}
                    </div>
                  </fieldset>

                  <div className="dashboard-audit-row">
                    <span>
                      Created: {moment(userDetails.createdAt).format('Do MMM YYYY')}
                    </span>
                    <span>
                      Updated: {moment(userDetails.updatedAt).format('Do MMM YYYY')}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {completedMemories.length > 0 && (
            <section className="dashboard-completed" aria-labelledby="completed-title">
              <header className="dashboard-section-header">
                <h2 id="completed-title">Completed memories</h2>
                <span>{completedMemories.length} completed</span>
              </header>
              <div className="dashboard-completed-component-wrapper">
                {completedMemories.map((memory) => (
                  <div key={memory._id}>
                    <CardComponent memory={memory} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default DashboardComponent;
