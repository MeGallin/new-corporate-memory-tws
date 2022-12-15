import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nameRegEx, emailRegEx } from '../../Utils/regEx';

import { contactFormAction } from '../../Store/actions/ContactFormActions';

import ButtonComponent from '../Button/ButtonComponent';
import InputComponent from '../Input/InputComponent';
import TextAreaComponent from '../TextArea/TextAreaComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import SuccessComponent from '../Success/SuccessComponent';
import ErrorComponent from '../Error/ErrorComponent';

const ContactComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { name, email, message } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    //Dispatch Action here
    dispatch(contactFormAction(formData));
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const contactForm = useSelector((state) => state.contactForm);
  const { loading, error, success } = contactForm;

  return (
    <>
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent
          message={'Your enquiry have been successfully submitted.'}
        />
      ) : null}

      {loading ? (
        <SpinnerComponent />
      ) : (
        <div className="wrapper">
          <fieldset className="fieldSet">
            <legend>Get In Touch</legend>
            <div>
              <p>
                If you have any questions or need help, please fill out the form
                below.
              </p>
              <form onSubmit={handleSubmitContactForm}>
                <InputComponent
                  label="Name"
                  value={name}
                  type="text"
                  name="name"
                  required
                  className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
                  error={
                    !nameRegEx.test(name) && name.length !== 0
                      ? `Name must contain at least 5 characters`
                      : null
                  }
                  onChange={handleOnChange}
                />
                <InputComponent
                  label="EMAIL"
                  value={email}
                  type="email"
                  name="email"
                  required
                  className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                  error={
                    !emailRegEx.test(email) && email.length !== 0
                      ? `Invalid email address.`
                      : null
                  }
                  onChange={handleOnChange}
                />
                <TextAreaComponent
                  label="How can we help you?"
                  id="message"
                  name="message"
                  value={message}
                  className={message.length <= 8 ? 'invalid' : 'entered'}
                  error={
                    message.length <= 8 && message?.length !== 0
                      ? `Message must contain at least 8 characters`
                      : null
                  }
                  onChange={handleOnChange}
                />
                <ButtonComponent
                  type="submit"
                  text={
                    !emailRegEx.test(email) ||
                    !nameRegEx.test(name) ||
                    message.length <= 8
                      ? 'Disabled'
                      : 'Submit your Enquiry'
                  }
                  variant="dark"
                  disabled={
                    !emailRegEx.test(email) ||
                    !nameRegEx.test(name) ||
                    message.length <= 8
                  }
                />
              </form>
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
};

export default ContactComponent;
