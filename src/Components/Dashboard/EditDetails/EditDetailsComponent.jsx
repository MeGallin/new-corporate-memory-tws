import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nameRegEx, emailRegEx, passwordRegEx } from '../../../Utils/regEx';
import { userEditDetailAction } from '../../../Store/actions/userActions';
import './EditDetailsComponent.scss';
import InputComponent from '../../Input/InputComponent';
import ButtonComponent from '../../Button/ButtonComponent';

const EditDetailsComponent = () => {
  const dispatch = useDispatch();
  const userInfoDetails = useSelector((state) => state.userInfoDetails);
  const { userDetails } = userInfoDetails;
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
  return (
    <fieldset className="fieldSet">
      <legend>Edit Details</legend>
      <div className="edit-details-wrapper">
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
              className={!passwordRegEx.test(password) ? 'invalid' : 'entered'}
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
      </div>
    </fieldset>
  );
};

export default EditDetailsComponent;
