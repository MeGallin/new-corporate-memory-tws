import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { contactFormReducer } from './reducers/contactFormReducer';
import {
  userLoginReducer,
  userRegistrationReducer,
  userForgotPWSendEmailReducer,
  userResetPasswordReducer,
} from './reducers/userReducers';
import {
  memoriesGetReducer,
  memoryCreateReducer,
} from './reducers/memoriesReducers';

//Initialise state to hold user info if logged in.
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const reducer = combineReducers({
  contactForm: contactFormReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userForgotPWSendEmail: userForgotPWSendEmailReducer,
  userResetPassword: userResetPasswordReducer,
  memoriesGet: memoriesGetReducer,
  memoryCreate: memoryCreateReducer,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
