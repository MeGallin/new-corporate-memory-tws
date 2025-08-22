export const getAuthenticatedUser = (state) => {
  if (state.userLogin?.userInfo) {
    return state.userLogin.userInfo;
  }

  if (state.googleUserLogin?.userInfo) {
    return state.googleUserLogin.userInfo;
  }

  return null;
};

export const createAuthConfig = (userInfo) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`,
  },
});
