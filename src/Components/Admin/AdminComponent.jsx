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

  return (
    <>
      {error && <ErrorComponent error={error} />}
      {loading && !success ? (
        <SpinnerComponent />
      ) : (
        <>
          <div className="admin-user-selector">
            <label htmlFor="user-select">Select a User:</label>
            <select id="user-select" onChange={handleUserSelect} defaultValue="">
              <option value="" disabled>
                --Please choose a user--
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
              <fieldset className="fieldSet">
                <legend>{selectedUser.name} Details</legend>
                <div className="edit-details-wrapper">
                  <div>
                    <div>
                      <span className="details-label">name: </span>
                      <span>{selectedUser.name}</span>
                    </div>
                    <div>
                      <span className="details-label">email: </span>
                      <span>{selectedUser.email}</span>
                    </div>
                    <div>
                      <span className="details-label">is Confirmed: </span>
                      <span>
                        {selectedUser.isConfirmed ? (
                          <FaRegThumbsUp
                            className="reg-thumbs-up-icon"
                            size={22}
                          />
                        ) : (
                          <FaRegThumbsDown
                            className="reg-thumbs-down-icon"
                            size={22}
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="is-admin-is-suspended-wrapper">
                    <div>
                      <ToggleSwitchComponent
                        id="isAdmin"
                        name="isAdmin"
                        checked={selectedUser.isAdmin}
                        disabled={selectedUser._id === userDetails?._id}
                        onChange={() =>
                          handleIsAdmin(selectedUser._id, selectedUser.isAdmin)
                        }
                      />
                      <span className="details-label">is admin: </span>
                      <span>
                        {selectedUser.isAdmin ? (
                          <FaRegThumbsUp
                            className="reg-thumbs-up-icon"
                            size={22}
                          />
                        ) : (
                          <FaRegThumbsDown
                            className="reg-thumbs-down-icon"
                            size={22}
                          />
                        )}
                      </span>
                    </div>
                    <div>
                      <ToggleSwitchComponent
                        id="isSuspended"
                        name="isSuspended"
                        checked={selectedUser.isSuspended}
                        disabled={selectedUser._id === userDetails?._id}
                        onChange={() =>
                          handleIsSuspended(
                            selectedUser._id,
                            selectedUser.isSuspended,
                          )
                        }
                      />
                      <span className="details-label">is Suspended: </span>
                      <span>
                        {selectedUser.isSuspended ? (
                          <FaRegThumbsUp
                            className="reg-thumbs-up-icon"
                            size={22}
                          />
                        ) : (
                          <FaRegThumbsDown
                            className="reg-thumbs-down-icon"
                            size={22}
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div>
                      <span className="details-label">login Counter: </span>
                      <span>{selectedUser.loginCounter}</span>
                    </div>
                    <div>
                      <span className="details-label">ip: </span>
                      <span>
                        {selectedUser.ipAddress === '::1' ? (
                          <span>LOCALHOST</span>
                        ) : (
                          selectedUser.ipAddress
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="user-details-dates-wrapper">
                  <div>
                    <span className="details-label">created: </span>
                    <span className="small-text">
                      {moment(selectedUser.updatedAt).diff(
                        moment(selectedUser.createdAt),
                        'days',
                      )}{' '}
                      days ago.
                    </span>
                  </div>
                  <div>
                    <span className="details-label">updated: </span>
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

              <fieldset className="fieldSet">
                <legend> {selectedUser.name}</legend>
                {selectedUser.name} has {userMemories?.length} Memories.
              </fieldset>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminComponent;
