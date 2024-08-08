import { END_POINT } from "../constants";

export const getFeatures = (tenantRight) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/user/feature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({ userId: tenantRight ? tenantRight : userId }),
  }).then((res) => res.json());
};

export const addFeatures = (tenantRight, payload) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/admin/add-feature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({
      userId: tenantRight ? tenantRight : userId,
      ...payload,
    }),
  }).then((res) => res.json());
};

export const updateFeatures = (tenantRight, payload) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/admin/update-feature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({
      userId: tenantRight ? tenantRight : userId,
      featureInfo: payload,
    }),
  }).then((res) => res.json());
};

export const deleteFeature = (tenantRight, id) => {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  return fetch(`${END_POINT}/v1/admin/delete-feature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
    body: JSON.stringify({
      userId: tenantRight ? tenantRight : userId,
      featureId: id,
    }),
  }).then((res) => res.json());
};
