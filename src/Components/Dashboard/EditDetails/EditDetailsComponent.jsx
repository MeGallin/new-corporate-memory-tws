import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nameRegEx, emailRegEx, passwordRegEx } from '../../../Utils/regEx';
import { userEditDetailAction } from '../../../Store/actions/userActions';
import './EditDetailsComponent.scss';
import InputComponent from '../../Input/InputComponent';
import ButtonComponent from '../../Button/ButtonComponent';

const EditDetailsComponent = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.userInfoDetails);

  const [editingField, setEditingField] = useState(null); // null, 'name', 'email', or 'password'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name || '',
        email: userDetails.email || '',
        password: '',
      });
    }
  }, [userDetails]);

  const { name, email, password } = formData;

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userEditDetailAction({ id: userDetails?._id }, formData));
    setEditingField(null);
  };

  const renderDisplayField = (field, title, value) => (
    <div>
      <span className="edit-title">{title}:</span>
      <span
        onClick={() => setEditingField(field)}
        className="edit-input"
        title={`Edit your ${field}`}
      >
        {value}
      </span>
    </div>
  );

  const renderEditField = (field, validationRegex) => {
    let currentValidation = true;
    if (formData[field]) {
        currentValidation = validationRegex.test(formData[field]);
    }

    return (
      <form onSubmit={handleSubmit}>
        <InputComponent
          label={`EDIT ${field}`}
          value={formData[field]}
          type={field === 'password' ? 'password' : 'text'}
          name={field}
          required
          className={!currentValidation ? 'invalid' : 'entered'}
          error={!currentValidation && formData[field].length > 0 ? `Invalid ${field}` : null}
          onChange={handleOnchange}
        />
        <ButtonComponent
          type="submit"
          text={!currentValidation ? 'Disabled' : 'UPDATE'}
          variant="dark"
          disabled={!currentValidation}
        />
        <ButtonComponent
          type="button"
          text="Close"
          variant="info"
          disabled={false}
          onClick={() => setEditingField(null)}
        />
      </form>
    );
  };

  return (
    <fieldset className="fieldSet">
      <legend>Edit Details</legend>
      <div className="edit-details-wrapper">
        {editingField === 'name'
          ? renderEditField('name', nameRegEx)
          : renderDisplayField('name', 'Name', userDetails?.name)}

        {editingField === 'email'
          ? renderEditField('email', emailRegEx)
          : renderDisplayField('email', 'Email', userDetails?.email)}

        {editingField === 'password'
          ? renderEditField('password', passwordRegEx)
          : renderDisplayField('password', 'Password', '********')}
      </div>
    </fieldset>
  );
};

export default EditDetailsComponent;
