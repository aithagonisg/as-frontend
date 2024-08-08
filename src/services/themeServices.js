import { END_POINT } from "../constants";

export const getThemes = (tenantTheme) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/user/theme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({ userId: tenantTheme ? tenantTheme : userId }),
  }).then((res) => res.json());
};

export const addtheme = (tenantTheme, payload) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/admin/add-theme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({
      userId: tenantTheme ? tenantTheme : userId,
      ...payload,
    }),
  }).then((res) => res.json());
};

export const updateTheme = (tenantTheme, payload) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/admin/update-theme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({
      userId: tenantTheme ? tenantTheme : userId,
      themeInfo: payload,
    }),
  }).then((res) => res.json());
};

export const deleteTheme = (tenantTheme, id) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/admin/delete-theme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({
      userId: tenantTheme ? tenantTheme : userId,
      themeId: id,
    }),
  }).then((res) => res.json());
};
