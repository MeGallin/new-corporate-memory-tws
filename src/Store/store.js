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
  googleUserLoginReducer,
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

import {
  memoryImageUploadReducer,
  memoryDeleteImageReducer,
  userProfileImageUploadReducer,
  userProfileImageDeleteReducer,
} from './reducers/imageUploadReducers';

import {
  adminGetAllUserDetailsReducer,
  adminIsAdminReducer,
  adminIsSuspendedReducer,
  adminDeleteAllUserReducer,
} from './reducers/adminReducers';

import { sortedMemoriesReducer } from './reducers/sortedMemories';

import { pageHitsReducer } from './reducers/pageHitCounterReducers';

//Initialise state to hold user info if logged in.
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const reducer = combineReducers({
  adminGetAllUserDetails: adminGetAllUserDetailsReducer,
  adminIsAdmin: adminIsAdminReducer,
  adminIsSuspended: adminIsSuspendedReducer,
  adminDeleteAllUser: adminDeleteAllUserReducer,
  contactForm: contactFormReducer,
  userLogin: userLoginReducer,
  userInfoDetails: userInfoDetailsReducer,
  userRegistration: userRegistrationReducer,
  userEditDetails: userEditDetailsReducer,
  userForgotPWSendEmail: userForgotPWSendEmailReducer,
  userResetPassword: userResetPasswordReducer,
  userProfileImageUpload: userProfileImageUploadReducer,
  userProfileImageDelete: userProfileImageDeleteReducer,
  googleUserLogin: googleUserLoginReducer,
  memoriesGet: memoriesGetReducer,
  memoryCreate: memoryCreateReducer,
  memoryEdit: memoryEditReducer,
  memoryDelete: memoryDeleteReducer,
  memoryDeleteTag: memoryDeleteTagReducer,
  memorySetDueDate: memorySetDueDateReducer,
  memoryIsComplete: memoryIsCompleteReducer,
  memoryImageUpload: memoryImageUploadReducer,
  memoryDeleteImage: memoryDeleteImageReducer,
  sortedMemories: sortedMemoriesReducer,
  pageHits: pageHitsReducer,
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
