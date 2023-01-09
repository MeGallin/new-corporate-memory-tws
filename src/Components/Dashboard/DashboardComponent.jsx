import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './DashboardComponent.scss';

import { memoriesGetAction } from '../../Store/actions/memoriesActions';

import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import moment from 'moment';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import CardComponent from '../Card/CardComponent';
import EditDetailsComponent from './EditDetails/EditDetailsComponent';
import AdminComponent from '../Admin/AdminComponent';

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userInfoDetails = useSelector((state) => state.userInfoDetails);
  const { userDetails } = userInfoDetails;
  const userEditDetails = useSelector((state) => state.userEditDetails);
  const { loading, success, error } = userEditDetails;
  const memoriesGet = useSelector((state) => state.memoriesGet);
  const { memories } = memoriesGet;

  useEffect(() => {
    let ignore = false;
    if (!userInfo && !userDetails?.isConfirmed) return navigate('/forms');
    if (!memories) dispatch(memoriesGetAction());
    if (!ignore);
    return () => (ignore = true);
  }, [userInfo, userDetails?.isConfirmed, navigate, memories, dispatch]);

  const completedMemories = memories?.filter((memory) => {
    if (memory.isComplete) {
      return memory;
    }
    return false;
  });

  return (
    <>
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent message={'Memory has bee successfully created.'} />
      ) : null}

      {loading ? (
        <SpinnerComponent />
      ) : (
        <div className="dashboard-wrapper">
          {userDetails?.isAdmin ? (
            <>
              <fieldset className="fieldSet">
                <legend>Users at a glance</legend>
                <AdminComponent />
              </fieldset>
            </>
          ) : null}

          <fieldset className="fieldSet">
            <legend>{userDetails?.name}</legend>
            <div>
              <EditDetailsComponent />
              <fieldset className="fieldSet">
                <legend>Details</legend>
                <div className="flex-wrapper-dates">
                  <div>
                    <img
                      className="dashboard-profile-img"
                      src={userDetails?.profileImage}
                      alt={userDetails?.name}
                    />
                  </div>

                  <div>
                    <h3>Stats</h3>
                    <div>
                      <span className="details-label">Total Memories: </span>
                      <span>{memories?.length}</span>
                    </div>
                    <div>
                      <span className="details-label">
                        Completed Memories:{' '}
                      </span>
                      <span>{completedMemories?.length}</span>
                    </div>
                  </div>

                  <div>
                    <h3>Basic Info</h3>
                    <div>
                      <span className="details-label">ID: </span>
                      <span>{userDetails?._id}</span>
                    </div>

                    <div>
                      <span className="details-label">
                        your current IP Address:{' '}
                      </span>
                      {userDetails?.ipAddress === '::1' ? (
                        <span>LOCALHOST</span>
                      ) : (
                        userDetails?.ipAddress
                      )}
                    </div>

                    <div>
                      <span className="details-label">Joined: </span>
                      <span>
                        {moment(userDetails?.updatedAt).diff(
                          moment(userDetails?.createdAt),
                          'days',
                        )}
                      </span>
                      <span> day ago.</span>
                    </div>

                    <div>
                      <span className="details-label">Login Count: </span>
                      <span>{userDetails?.loginCounter}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-wrapper">
                  <div>
                    <span className="details-label">Is Admin: </span>
                    <span>
                      {userDetails?.isAdmin ? (
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
                    <span className="details-label">Is Confirmed: </span>
                    <span>
                      {userDetails?.isConfirmed ? (
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
                    <span className="details-label">Is Suspended: </span>
                    <span>
                      {userDetails?.isSuspended ? (
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

                <div className="flex-wrapper-dates">
                  <div>
                    <span className="details-label">Created: </span>
                    <span>
                      {moment(userDetails?.createdAt).format('Do MMMM YYYY')}
                    </span>
                  </div>

                  <div>
                    <span className="details-label">Updated: </span>
                    <span>
                      {moment(userDetails?.updatedAt).format('Do MMMM YYYY')}
                    </span>
                  </div>
                </div>
              </fieldset>
            </div>
          </fieldset>

          <fieldset className="fieldSet">
            <legend>Completed Memories</legend>
            {completedMemories?.length > 0 ? (
              <div className="dashboard-completed-component-wrapper">
                {memories?.map((memory) => (
                  <div
                    key={memory._id}
                    className={!memory.isComplete ? 'dashboard-completed' : ''}
                  >
                    <CardComponent
                      id={memory._id}
                      title={memory.title}
                      dueDate={memory.dueDate}
                      memory={memory.memory}
                      voice={memory.memory}
                      imgSrc={memory.memoryImage}
                      setDueDate={memory.setDueDate}
                      isComplete={memory.isComplete}
                      priority={memory.priority}
                      tag={memory.tags.map((tag) => tag)}
                      created={memory.createdAt}
                      updated={memory.updatedAt}
                    />
                  </div>
                ))}
              </div>
            ) : (
              'You currently have no completed memories'
            )}
          </fieldset>
        </div>
      )}
    </>
  );
};

export default DashboardComponent;
