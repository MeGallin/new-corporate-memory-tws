import {
  CONTACT_FORM_FAILURE,
  CONTACT_FORM_REQUEST,
  CONTACT_FORM_SUCCESS,
} from '../constants/contactFormConstants';
import axios from 'axios';
import { buildApiUrl } from '../utils/api';
import { isValidEmail, isValidName } from '../../Utils/validation';
import { getApiErrorMessage } from '../utils/errors';

export const contactFormAction = (formData) => async (dispatch) => {
  try {
    if (!isValidName(formData?.name)) {
      dispatch({
        type: CONTACT_FORM_FAILURE,
        payload: 'Enter your first name and surname.',
      });
      return;
    }
    if (!isValidEmail(formData?.email)) {
      dispatch({
        type: CONTACT_FORM_FAILURE,
        payload: 'Enter a valid email address.',
      });
      return;
    }
    if (typeof formData?.message !== 'string' || formData.message.trim().length < 9) {
      dispatch({
        type: CONTACT_FORM_FAILURE,
        payload: 'Message must contain at least 9 characters.',
      });
      return;
    }

    dispatch({
      type: CONTACT_FORM_REQUEST,
    });
    const { data } = await axios.post(
      buildApiUrl('contactForm'),
      formData,
    );
    dispatch({ type: CONTACT_FORM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_FORM_FAILURE,
      payload: getApiErrorMessage(error),
    });
  }
};
