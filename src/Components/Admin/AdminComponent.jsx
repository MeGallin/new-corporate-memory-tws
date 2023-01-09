import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminComponent.scss';

import { adminGetAllUserDetailsAction } from '../../Store/actions/adminActions';
import ErrorComponent from '../Error/ErrorComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import moment from 'moment';

const AdminComponent = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState('');
  const [userLoginCounter, setUserLoginCounter] = useState('');
  const [userIsSuspended, setUserIsSuspended] = useState('');
  const [userIpAddress, setUserIpAddress] = useState('');
  const [userCreatedAt, setUserCreatedAt] = useState('');
  const [userUpdatedAt, setUserUpdatedAt] = useState('');

  const [showNames, setShowNames] = useState(false);

  useEffect(() => {
    let ignore = false;
    dispatch(adminGetAllUserDetailsAction());
    if (!ignore);
    return () => (ignore = true);
  }, [dispatch]);

  const adminGetAllUserDetails = useSelector(
    (state) => state.adminGetAllUserDetails,
  );
  const { loading, success, error, users, memories } = adminGetAllUserDetails;
  //   console.log(users);
  const userMemories = memories?.filter((obj) => obj?.user === userId);
  //   console.log(userMemories);

  const handleUser = (
    id,
    userName,
    userEmail,
    userIsAdmin,
    userIsSuspended,
    userLoginCounter,
    userIpAddress,
    userCreatedAt,
    userUpdatedAt,
  ) => {
    setUserId(id);
    setUserName(userName);
    setUserEmail(userEmail);
    setUserIsAdmin(userIsAdmin);
    setUserIsSuspended(userIsSuspended);
    setUserLoginCounter(userLoginCounter);
    setUserIpAddress(userIpAddress);
    setUserCreatedAt(userCreatedAt);
    setUserUpdatedAt(userUpdatedAt);
    setShowNames(false);
  };

  return (
    <>
      {error ? <ErrorComponent error={error} /> : null}
      {loading && !success ? (
        <SpinnerComponent />
      ) : (
        <>
          <h3
            className="admin-component-select-name-dropdown"
            onClick={() => setShowNames((prev) => !prev)}
          >
            Click to Select A User
          </h3>

          {users?.map((user) =>
            showNames ? (
              <div key={user?._id}>
                <div
                  className="admin-component-select-name"
                  onClick={() =>
                    handleUser(
                      user?._id,
                      user?.name,
                      user?.email,
                      user?.isAdmin,
                      user?.isSuspended,
                      user?.loginCounter,
                      user?.ipAddress,
                      user?.createdAt,
                      user?.updatedAt,
                    )
                  }
                >
                  {user?.name}
                </div>
              </div>
            ) : null,
          )}

          <fieldset className="fieldSet">
            <legend>{userName} Details</legend>

            {userName ? (
              <>
                <div className="edit-details-wrapper">
                  <div>
                    <div>
                      <span className="details-label">name: </span>
                      <span>{userName}</span>
                    </div>
                    <div>
                      <span className="details-label">email: </span>
                      <span>{userEmail}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="details-label">is admin: </span>
                      <span>
                        {userIsAdmin ? (
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
                      <span className="details-label">is Suspended: </span>
                      <span>
                        {userIsSuspended ? (
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
                      <span>{userLoginCounter}</span>
                    </div>
                    <div>
                      <span className="details-label">ip: </span>
                      <span>
                        {userIpAddress === '::1' ? (
                          <span>LOCALHOST</span>
                        ) : (
                          userIpAddress
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="details-label">created: </span>
                    <span>
                      {moment(userUpdatedAt).diff(
                        moment(userCreatedAt),
                        'days',
                      )}{' '}
                      days ago.
                    </span>
                  </div>
                  <div>
                    <span className="details-label">updated: </span>
                    <span>{moment(userUpdatedAt).fromNow()}</span>
                  </div>
                </div>
              </>
            ) : null}
          </fieldset>

          <fieldset className="fieldSet">
            <legend>
              {' '}
              {userName} has {userMemories?.length} Memories
            </legend>
            {userMemories?.map((userMemory) => (
              <>
                <div key={userMemory?._id}>{userMemory?.title}</div>
              </>
            ))}
          </fieldset>
        </>
      )}
    </>
  );
};

export default AdminComponent;
