import { END_POINT } from "../constants";
export const getFeatures = () => {
  return fetch(`${END_POINT}/v1/user/feature`).then((res) => res.json());
};

export const addFeatures = (payload) => {
  return fetch(`${END_POINT}/v1/admin/add-feature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const updateFeatures = (payload) => {
  return fetch(`${END_POINT}/v1/admin/update-feature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const deleteFeature = (id) => {
  return fetch(`${END_POINT}/v1/admin/delete-feature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: id }),
  }).then((res) => res.json());
};
