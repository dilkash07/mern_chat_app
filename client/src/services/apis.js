const baseUrl = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endPoints = {
  LOGIN_API: baseUrl + "/auth/login",
  SIGNUP_API: baseUrl + "/auth/signup",
};

// USER ENDPOINTS
export const userEndPoints = {
  GET_USERS_API: baseUrl + "/user/get-users",
  GET_USER_PROFILE_API: baseUrl + "/user/get-user-profile",
};

// MESSAGE ENDPOINTS
export const messageEndpoints = {
  GET_MESSAGES_API: baseUrl + "/message/get-message/",
  SEND_MESSAGES_API: baseUrl + "/message/send-message/",
};
