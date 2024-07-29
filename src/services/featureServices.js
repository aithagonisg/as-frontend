import { END_POINT } from "../constants";
export const getFeatures = () => {
  return fetch(`${END_POINT}/v1/user/feature`).then((res) => res.json());
};
