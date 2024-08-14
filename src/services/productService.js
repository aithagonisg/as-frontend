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
      limit: 8,
      categories: [...categoriesList],
      brand: brand,
      priceMin: priceMin,
      priceMax: priceMax,
      search: search,
    }),
  }).then((res) => res.json());
};

export const getProduct = (id) => {
  return fetch(`${END_POINT}/v1/common/product?productId=${id}`).then((res) =>
    res.json()
  );
};

export const getCategories = () => {
  return fetch(`${END_POINT}/v1/user/getCategories`).then((res) => res.json());
};

// "/v1/user/get-from-cart"
export const getItemsFromCart = () => {
  return fetch(`${END_POINT}/v1/user/get-from-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
    }),
  }).then((res) => res.json());
};

export const addCartItems = (productItem) => {
  return fetch(`${END_POINT}/v1/user/add-to-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
      productDetails: productItem,
    }),
  }).then((res) => res.json());
};

export const removeCartItems = () => {};
