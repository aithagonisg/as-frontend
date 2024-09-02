import { END_POINT } from "../constants";

export const addAddress = (address) => {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  return fetch(`${END_POINT}/v1/user/add-address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({ userId: userId, address: address }),
  }).then((res) => res.json());
};

export const getAddressList = () => {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  return fetch(`${END_POINT}/v1/user/get-address-list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({ userId: userId }),
  }).then((res) => res.json());
};
