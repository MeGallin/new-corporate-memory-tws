import {
  CONTACT_FORM_FAILURE,
  CONTACT_FORM_REQUEST,
  CONTACT_FORM_SUCCESS,
  CONTACT_FORM_RESET,
} from '../constants/contactFormConstants';

export const contactFormReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_FORM_REQUEST:
      return { loading: true };
    case CONTACT_FORM_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload,
      };
    case CONTACT_FORM_RESET:
      return {};
    case CONTACT_FORM_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
