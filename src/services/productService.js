import { END_POINT } from "../constants";

export const getProducts = (payload) => {
  return fetch(`${END_POINT}/v1/common/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: 1,
      limit: 25,
      categories: [],
      brand: "",
      priceMin: 0,
      priceMax: 99999,
      search: "",
    }),
  }).then((res) => res.json());
};
