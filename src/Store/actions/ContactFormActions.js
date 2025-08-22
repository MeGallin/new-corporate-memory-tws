import {
  CONTACT_FORM_FAILURE,
  CONTACT_FORM_REQUEST,
  CONTACT_FORM_SUCCESS,
} from '../constants/contactFormConstants';
import axios from 'axios';
import { buildApiUrl } from '../utils/api';

export const contactFormAction = (formData) => async (dispatch) => {
  try {
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
