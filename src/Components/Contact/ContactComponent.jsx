import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isValidEmail, isValidName } from '../../Utils/validation';

import { contactFormAction } from '../../Store/actions/ContactFormActions';
import { CONTACT_FORM_RESET } from '../../Store/constants/contactFormConstants';

import ButtonComponent from '../Button/ButtonComponent';
import InputComponent from '../Input/InputComponent';
import TextAreaComponent from '../TextArea/TextAreaComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import SuccessComponent from '../Success/SuccessComponent';
import ErrorComponent from '../Error/ErrorComponent';
import './ContactComponent.scss';

const ContactComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { name, email, message } = formData;

  const isNameInvalid = name.length > 0 && !isValidName(name);
  const isEmailInvalid = email.length > 0 && !isValidEmail(email);
  const isMessageInvalid = message.length > 0 && message.trim().length < 9;
  const isFormInvalid =
    !isValidName(name) || !isValidEmail(email) || message.trim().length < 9;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    if (isFormInvalid) return;
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
          message="Your enquiry has been successfully submitted."
          onClose={() => dispatch({ type: CONTACT_FORM_RESET })}
        />
      ) : null}

      {loading ? (
        <SpinnerComponent />
      ) : (
        <section className="contact-workbench" aria-labelledby="contact-heading">
          <div className="contact-workbench__header">
            <div>
              <p>Support and general enquiries</p>
              <h1 id="contact-heading">Contact workspace</h1>
            </div>
            <span>Public enquiry</span>
          </div>

          <div className="contact-workbench__grid">
            <aside className="contact-guidance" aria-label="Enquiry guidance">
              <fieldset className="query-fieldset">
                <legend>Before you send</legend>
                <div className="contact-guidance__intro">
                  <h2>How can we help?</h2>
                  <p>
                    Share the issue or question clearly and provide an email
                    address where we can reply.
                  </p>
                </div>
                <dl className="contact-guidance__list">
                  <div>
                    <dt>Be specific</dt>
                    <dd>Include the page, action, or feature involved.</dd>
                  </div>
                  <div>
                    <dt>Protect your account</dt>
                    <dd>Do not include passwords, tokens, or secret keys.</dd>
                  </div>
                  <div>
                    <dt>Check your email</dt>
                    <dd>Use an address where you can receive our response.</dd>
                  </div>
                </dl>
              </fieldset>
            </aside>

            <form className="contact-form" onSubmit={handleSubmitContactForm}>
              <fieldset className="query-fieldset">
                <legend>Send an enquiry</legend>
                <div className="contact-form__intro">
                  <h2>Tell us what you need</h2>
                  <p>Complete all three fields before sending your enquiry.</p>
                </div>

                <div className="contact-form__identity">
                  <InputComponent
                    id="contact-name"
                    label="Name"
                    value={name}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className={isNameInvalid ? 'invalid' : name ? 'entered' : ''}
                    error={
                      isNameInvalid
                        ? 'Enter your first name and surname.'
                        : null
                    }
                    onChange={handleOnChange}
                  />
                  <InputComponent
                    id="contact-email"
                    label="Email"
                    value={email}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className={isEmailInvalid ? 'invalid' : email ? 'entered' : ''}
                    error={
                      isEmailInvalid
                        ? 'Enter a valid email address.'
                        : null
                    }
                    onChange={handleOnChange}
                  />
                </div>

                <div className="contact-form__message">
                  <div>
                    <label htmlFor="contact-message">Message</label>
                    <span id="contact-message-help">
                      {message.trim().length} characters, 9 minimum
                    </span>
                  </div>
                  <TextAreaComponent
                    id="contact-message"
                    name="message"
                    value={message}
                    placeholder="Describe your question or the help you need"
                    aria-describedby="contact-message-help"
                    required
                    minLength={9}
                    className={
                      isMessageInvalid ? 'invalid' : message ? 'entered' : ''
                    }
                    error={
                      isMessageInvalid
                        ? 'Message must contain at least 9 characters.'
                        : null
                    }
                    onChange={handleOnChange}
                  />
                </div>

                <div className="contact-form__actions">
                  <ButtonComponent
                    type="submit"
                    text="Send enquiry"
                    variant="success"
                    disabled={isFormInvalid}
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactComponent;
