import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminComponent.scss';

import {
  adminGetAllUserDetailsAction,
  adminIsAdminAction,
  adminIsSuspendedAction,
} from '../../Store/actions/adminActions';
import ErrorComponent from '../Error/ErrorComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import moment from 'moment';
import ToggleSwitchComponent from '../ToggleSwitch/ToggleSwitchComponent';
import AdminDeleteUserComponent from '../AdminDeleteUser/AdminDeleteUserComponent';

const AdminComponent = () => {
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.userInfoDetails);
  const { loading, success, error, users, memories } = useSelector(
    (state) => state.adminGetAllUserDetails,
  );

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(adminGetAllUserDetailsAction());
  }, [dispatch]);

  // This effect synchronizes the local selectedUser state with the user list from Redux.
  // It runs whenever the main 'users' list is updated.
  useEffect(() => {
    if (selectedUser && users) {
      const updatedUser = users.find((u) => u._id === selectedUser._id);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  }, [users, selectedUser]);

  const handleUserSelect = (e) => {
    const userId = e.target.value;
    if (userId) {
      const user = users.find((u) => u._id === userId);
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  const handleIsAdmin = (id, isAdmin) => {
    dispatch(adminIsAdminAction({ id, toggledValue: !isAdmin }));
  };

  const handleIsSuspended = (id, isSuspended) => {
    dispatch(adminIsSuspendedAction({ id, toggledValue: !isSuspended }));
  };

  const userMemories = selectedUser
    ? memories?.filter((obj) => obj?.user === selectedUser._id)
    : [];

  const renderStatus = (isEnabled) => (
    <span className="admin-status-value">
      {isEnabled ? (
        <FaRegThumbsUp className="reg-thumbs-up-icon" aria-hidden="true" />
      ) : (
        <FaRegThumbsDown className="reg-thumbs-down-icon" aria-hidden="true" />
      )}
      <span>{isEnabled ? 'Yes' : 'No'}</span>
    </span>
  );

  return (
    <>
      {error && <ErrorComponent error={error} />}
      {loading && !success ? (
        <SpinnerComponent />
      ) : (
        <>
          <div className="admin-user-selector">
            <label htmlFor="user-select">Choose an account</label>
            <select id="user-select" onChange={handleUserSelect} defaultValue="">
              <option value="" disabled>
                Select a user
              </option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {selectedUser && (
            <>
              <fieldset className="query-fieldset admin-selected-user">
                <legend>{selectedUser.name} account</legend>
                <div className="edit-details-wrapper">
                  <section className="admin-detail-card" aria-labelledby="identity-title">
                    <h3 id="identity-title">Identity</h3>
                    <dl className="admin-detail-list">
                      <div>
                        <dt>Name</dt>
                        <dd>{selectedUser.name}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>{selectedUser.email}</dd>
                      </div>
                      <div>
                        <dt>Confirmed</dt>
                        <dd>{renderStatus(selectedUser.isConfirmed)}</dd>
                      </div>
                    </dl>
                  </section>

                  <section
                    className="admin-detail-card is-admin-is-suspended-wrapper"
                    aria-labelledby="access-title"
                  >
                    <h3 id="access-title">Access controls</h3>
                    <div className="admin-access-grid">
                      <div className="admin-access-control">
                        <div>
                          <span className="details-label">Administrator</span>
                          {renderStatus(selectedUser.isAdmin)}
                        </div>
                      <ToggleSwitchComponent
                        id="isAdmin"
                        name="isAdmin"
                        ariaLabel={`Change administrator access for ${selectedUser.name}`}
                        checked={selectedUser.isAdmin}
                        disabled={selectedUser._id === userDetails?._id}
                        onChange={() =>
                          handleIsAdmin(selectedUser._id, selectedUser.isAdmin)
                        }
                      />
                      </div>
                      <div className="admin-access-control">
                        <div>
                          <span className="details-label">Suspended</span>
                          {renderStatus(selectedUser.isSuspended)}
                        </div>
                      <ToggleSwitchComponent
                        id="isSuspended"
                        name="isSuspended"
                        ariaLabel={`Change suspension status for ${selectedUser.name}`}
                        checked={selectedUser.isSuspended}
                        disabled={selectedUser._id === userDetails?._id}
                        onChange={() =>
                          handleIsSuspended(
                            selectedUser._id,
                            selectedUser.isSuspended,
                          )
                        }
                      />
                      </div>
                    </div>
                  </section>

                  <section className="admin-detail-card" aria-labelledby="activity-title">
                    <h3 id="activity-title">Activity</h3>
                    <dl className="admin-detail-list">
                      <div>
                        <dt>Login count</dt>
                        <dd>{selectedUser.loginCounter}</dd>
                      </div>
                      <div>
                        <dt>IP address</dt>
                        <dd>
                          {selectedUser.ipAddress === '::1'
                            ? 'LOCALHOST'
                            : selectedUser.ipAddress}
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>

                <div className="user-details-dates-wrapper">
                  <div>
                    <span className="details-label">Member since: </span>
                    <span className="small-text">
                      {moment(selectedUser.createdAt).format('Do MMM YYYY')}
                    </span>
                  </div>
                  <div>
                    <span className="details-label">Updated: </span>
                    <span className="small-text">
                      {moment(selectedUser.updatedAt).fromNow()}
                    </span>
                  </div>
                </div>
                {selectedUser._id !== userDetails?._id && (
                  <AdminDeleteUserComponent
                    id={selectedUser._id}
                    name={selectedUser.name}
                  />
                )}
              </fieldset>

              <fieldset className="query-fieldset admin-selected-summary">
                <legend>Memory summary</legend>
                <div className="admin-memory-summary">
                  <strong>{userMemories?.length || 0}</strong>
                  <span>Memories owned by {selectedUser.name}</span>
                </div>
              </fieldset>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminComponent;
