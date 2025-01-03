const baseUrl = "https://mansurichat.onrender.com/api/v1";

// AUTH ENDPOINTS
export const endPoints = {
  LOGIN_API: baseUrl + "/auth/login",
  SIGNUP_API: baseUrl + "/auth/signup",
  SEND_OTP_API: baseUrl + "/auth/send-otp",
  RESET_PASSWORD_TOKEN_API: baseUrl + "/auth/reset-password-token",
  RESET_PASSWORD_API: baseUrl + "/auth/reset-password/",
};

// USER ENDPOINTS
export const userEndPoints = {
  GET_USERS_API: baseUrl + "/user/get-users",
  GET_SEARCH_USER_API: baseUrl + "/user/get-search-user",
  GET_CONVERSED_USERS_API: baseUrl + "/user/get-conversed-users",
  UPDATE_PROFILE_PICTURE_API: baseUrl + "/user/update-profile-picture",
  UPDATE_NAME_API: baseUrl + "/user/update-name",
  UPDATE_ABOUT_API: baseUrl + "/user/update-about",
};

// MESSAGE ENDPOINTS
export const messageEndpoints = {
  GET_MESSAGES_API: baseUrl + "/message/get-message/",
  SEND_MESSAGES_API: baseUrl + "/message/send-message/",
};
