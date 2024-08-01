import { END_POINT } from "../constants";
export const getThemes = () => {
  return fetch(`${END_POINT}/v1/user/theme`).then((res) => res.json());
};

export const updateTheme = (themeData) => {
  return fetch(`${END_POINT}/v1/admin/update-theme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(themeData),
  }).then((res) => res.json());
};

export const deleteTheme = (id) => {
  return fetch(`${END_POINT}/v1/admin/delete-theme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: id }),
  }).then((res) => res.json());
};
