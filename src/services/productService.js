import { END_POINT } from "../constants";

export const getProducts = (
  categoriesList,
  page,
  brand = "",
  priceMin = 100,
  priceMax = 2000,
  search = ""
) => {
  return fetch(`${END_POINT}/v1/common/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
      limit: 25,
      categories: [...categoriesList],
      brand: brand,
      priceMin: priceMin,
      priceMax: priceMax,
      search: search,
    }),
  }).then((res) => res.json());
};

export const getCategories = () => {
  return fetch(`${END_POINT}/v1/user/getCategories`).then((res) => res.json());
};
