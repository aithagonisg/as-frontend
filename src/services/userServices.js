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
