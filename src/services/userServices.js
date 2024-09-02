import { END_POINT } from "../constants";

export const registerUser = (payload) => {
  return fetch(`${END_POINT}/v1/common/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const loginUser = (payload) => {
  return fetch(`${END_POINT}/v1/common/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const getUserList = () => {
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/common/getUsers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
  }).then((res) => res.json());
};

export const getUserInfo = () => {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  return fetch(`${END_POINT}/v1/user/get-user-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({ userId: userId }),
  }).then((res) => res.json());
};

export const updateUserInfo = (updatedProfile) => {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  return fetch(`${END_POINT}/v1/user/update-user-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({ userId: userId, userInfo: updatedProfile }),
  }).then((res) => res.json());
};

export const uploadImage = (payload) => {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  return fetch(`${END_POINT}/v1/common/${userId}/profile-image`, {
    method: "POST",
    headers: {
      authorization: authToken,
    },
    body: payload,
  }).then((res) => res.json());
};

export const deleteImage = () => {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  return fetch(`${END_POINT}/v1/common/${userId}/profile-image`, {
    method: "DELETE",
    headers: {
      authorization: authToken,
    },
  }).then((res) => res.json());
};
