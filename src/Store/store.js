import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { contactFormReducer } from './reducers/contactFormReducer';
import {
  userLoginReducer,
  userInfoDetailsReducer,
  userRegistrationReducer,
  userEditDetailsReducer,
  userForgotPWSendEmailReducer,
  userResetPasswordReducer,
  userPageHitsReducer,
} from './reducers/userReducers';
import {
  memoriesGetReducer,
  memoryCreateReducer,
  memoryEditReducer,
  memoryDeleteReducer,
  memoryDeleteTagReducer,
  memorySetDueDateReducer,
  memoryIsCompleteReducer,
} from './reducers/memoriesReducers';

import { memoryImageUploadReducer } from './reducers/imageUploadReducers';

//Initialise state to hold user info if logged in.
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const reducer = combineReducers({
  contactForm: contactFormReducer,
  userLogin: userLoginReducer,
  userInfoDetails: userInfoDetailsReducer,
  userRegistration: userRegistrationReducer,
  userEditDetails: userEditDetailsReducer,
  userForgotPWSendEmail: userForgotPWSendEmailReducer,
  userResetPassword: userResetPasswordReducer,
  userPageHits: userPageHitsReducer,
  memoriesGet: memoriesGetReducer,
  memoryCreate: memoryCreateReducer,
  memoryEdit: memoryEditReducer,
  memoryDelete: memoryDeleteReducer,
  memoryDeleteTag: memoryDeleteTagReducer,
  memorySetDueDate: memorySetDueDateReducer,
  memoryIsComplete: memoryIsCompleteReducer,
  memoryImageUpload: memoryImageUploadReducer,
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
