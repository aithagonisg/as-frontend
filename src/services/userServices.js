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
  return fetch(`${END_POINT}/v1/common/getUsers`).then((res) => res.json());
};
