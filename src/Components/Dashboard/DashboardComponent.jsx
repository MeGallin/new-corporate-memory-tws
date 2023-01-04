import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nameRegEx, emailRegEx, passwordRegEx } from '../../Utils/regEx';
import './DashboardComponent.scss';

import { userEditDetailAction } from '../../Store/actions/userActions';
import { memoriesGetAction } from '../../Store/actions/memoriesActions';

import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import moment from 'moment';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import CardComponent from '../Card/CardComponent';

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

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: userDetails?.name,
    email: userDetails?.email,
    password: '',
  });
  const { name, email, password } = formData;

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    //Dispatch the Action
    dispatch(userEditDetailAction({ id: userDetails?._id }, formData));
    setEditName(false);
  };

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
          <fieldset className="fieldSet">
            <legend>{userDetails?.name}</legend>
            <div>
              <img
                className="dashboard-profile-img"
                src={userDetails?.profileImage}
                alt={userDetails?.name}
              />
              <div>
                <span className="edit-title">ID: </span>
                <span title="Edit your name">{userDetails?._id}</span>
              </div>
              {editName ? (
                <form onSubmit={handleRegistrationSubmit}>
                  <InputComponent
                    label="EDIT Name"
                    value={name}
                    type="text"
                    name="name"
                    required
                    className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
                    error={
                      !nameRegEx.test(name) && name.length !== 0
                        ? `Name field must contain a first name and surname both of which must start with a capital letter.`
                        : null
                    }
                    onChange={handleOnchange}
                  />
                  <ButtonComponent
                    type="submit"
                    text={!nameRegEx.test(name) ? 'Disabled' : 'UPDATE'}
                    variant="dark"
                    disabled={!nameRegEx.test(name)}
                  />

                  <ButtonComponent
                    type="button"
                    text="Close"
                    variant="info"
                    disabled={false}
                    onClick={() => setEditName((prev) => !prev)}
                  />
                </form>
              ) : (
                <div>
                  <span className="edit-title">Name:</span>
                  <span
                    onClick={() => setEditName((prev) => !prev)}
                    className="edit-input"
                    title="Edit your name"
                  >
                    {userDetails?.name}
                  </span>
                </div>
              )}
              {editEmail ? (
                <form onSubmit={handleRegistrationSubmit}>
                  <InputComponent
                    label="EDIT Email"
                    type="email"
                    name="email"
                    value={email}
                    className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                    error={
                      !emailRegEx.test(email) && email.length !== 0
                        ? `Invalid email address.`
                        : null
                    }
                    onChange={handleOnchange}
                  />

                  <ButtonComponent
                    type="submit"
                    text={!emailRegEx.test(email) ? 'Disabled' : 'UPDATE'}
                    variant="dark"
                    disabled={!emailRegEx.test(email)}
                  />
                  <ButtonComponent
                    type="button"
                    text="Close"
                    variant="info"
                    disabled={false}
                    onClick={() => setEditEmail((prev) => !prev)}
                  />
                </form>
              ) : (
                <div>
                  <span className="edit-title">Email:</span>
                  <span
                    onClick={() => setEditEmail((prev) => !prev)}
                    className="edit-input"
                    title="Edit your Email"
                  >
                    {userDetails?.email}
                  </span>
                </div>
              )}
              {editPassword ? (
                <form onSubmit={handleRegistrationSubmit}>
                  <InputComponent
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    required
                    className={
                      !passwordRegEx.test(password) ? 'invalid' : 'entered'
                    }
                    error={
                      !passwordRegEx.test(password) && password.length !== 0
                        ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                        : null
                    }
                    onChange={handleOnchange}
                  />

                  <ButtonComponent
                    type="submit"
                    text={!passwordRegEx.test(password) ? 'Disabled' : 'UPDATE'}
                    variant="dark"
                    disabled={!passwordRegEx.test(password)}
                  />
                  <ButtonComponent
                    type="button"
                    text="Close"
                    variant="info"
                    disabled={false}
                    onClick={() => setEditPassword((prev) => !prev)}
                  />
                </form>
              ) : (
                <div>
                  <span className="edit-title">PASSWORD: </span>
                  <span
                    onClick={() => setEditPassword((prev) => !prev)}
                    className="edit-input"
                    title="Edit your Password"
                  >
                    ********
                  </span>
                </div>
              )}
              <div>
                <span className="edit-title">your current IP Address: </span>
                {userDetails?.ipAddress === '::1' ? (
                  <span>LOCALHOST</span>
                ) : (
                  userDetails?.ipAddress
                )}
              </div>

              <div>
                <span className="edit-title">Joined: </span>
                <span>
                  {moment(userDetails?.updatedAt).diff(
                    moment(userDetails?.createdAt),
                    'days',
                  )}
                </span>
                <span> day ago.</span>
              </div>

              <div>
                <span className="edit-title">Login Count: </span>
                <span>{userDetails?.loginCounter}</span>
              </div>

              <div>
                <span className="edit-title">Is Admin: </span>
                <span>
                  {userDetails?.isAdmin ? (
                    <FaRegThumbsUp style={{ color: 'green' }} />
                  ) : (
                    <FaRegThumbsDown style={{ color: 'crimson' }} />
                  )}
                </span>
              </div>
              <div>
                <span className="edit-title">Is Confirmed: </span>
                <span>
                  {userDetails?.isConfirmed ? (
                    <FaRegThumbsUp style={{ color: 'green' }} />
                  ) : (
                    <FaRegThumbsDown style={{ color: 'crimson' }} />
                  )}
                </span>
              </div>
              <div>
                <span className="edit-title">Is Suspended: </span>
                <span>
                  {userDetails?.isSuspended ? (
                    <FaRegThumbsUp style={{ color: 'green' }} />
                  ) : (
                    <FaRegThumbsDown style={{ color: 'crimson' }} />
                  )}
                </span>
              </div>
              <div>
                <span className="edit-title">Created: </span>
                <span>
                  {moment(userDetails?.createdAt).format('Do MMMM YYYY')}
                </span>
              </div>

              <div>
                <span className="edit-title">Updated: </span>
                <span>
                  {moment(userDetails?.updatedAt).format('Do MMMM YYYY')}
                </span>
              </div>
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
