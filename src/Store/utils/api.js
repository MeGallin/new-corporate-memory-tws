const API_BASE_URL = process.env.REACT_APP_END_POINT;

const ENDPOINTS = {
  // User related
  userDetails: 'api/user-details',
  login: 'api/login',
  googleLogin: 'api/google-login',
  register: 'api/register',
  forgotPassword: 'api/forgot-password',
  resetPassword: 'api/resetpassword',
  user: 'api/user',

  // Admin related
  adminGetAllUserDetails: 'api/admin/users',
  adminToggleAdmin: 'api/admin/user-is-admin',
  adminToggleSuspended: 'api/admin/user-is-suspended',
  adminDeleteUserData: 'api/admin/user-memories-delete',

  // Memories related
  memories: 'api/memories',
  createMemory: 'api/create-memory',
  editMemory: 'api/edit-memory',
  deleteMemory: 'api/delete-memory',
  deleteMemoryTag: 'api/delete-memory-tag',

  // Image Upload related
  userProfileUploadImage: 'api/user-profile-upload-image',
  userProfileDeleteImage: 'api/user-profile-image-delete',
  memoryUploadImage: 'api/memory-upload-image',
  memoryDeleteImage: 'api/delete-memory-image',

  // Contact Form related
  contactForm: 'api/contact-form',

  // Page Hits related
  pageHits: 'api/page-hits',
};

export const buildApiUrl = (endpointKey, param = '') => {
  const path = ENDPOINTS[endpointKey];
  if (!path) {
    console.error(`Unknown API endpoint key: ${endpointKey}`);
    return '';
  }
  const url = `${API_BASE_URL}${path}`;
  return param ? `${url}/${param}` : url;
};
