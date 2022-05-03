// BEGIN PART 11

// YOUR CODE HERE

// END PART 11

export const UpdateProfile = (fileName) => ({
  type: "UPDATE_PROFILE",
  payload: fileName,
});
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const Logout = () => ({
  type: "LOGOUT",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
