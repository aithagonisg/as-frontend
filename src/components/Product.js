import React from "react";
import Card from "./commonComponents/Card";
import { END_POINT } from "../constants";
import Heading from "./commonComponents/Heading";
import Label from "./commonComponents/Label";
import Button from "./commonComponents/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { addCartItems } from "../services/productService";
import StarRating from "./StarRating";

export default function Product({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = (productData) => {
    const filteredProduct = {
      ...productData,
      colors: productData.colors[0] || "",
      sizes: productData.sizes[0] || "",
    };
    addCartItems(filteredProduct)
      .then((res) => {
        dispatch(addItem(filteredProduct));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Card img={`${END_POINT}${data.image_url}`}>
        <div className="w-full">
          <div className="flex justify-between text-base font-medium text-textPrimary py-0.5">
            <h3>{data.title}</h3>
            <p className="ml-4">${data.price}</p>
          </div>
          <div className="text-gray-500 py-0.5 flex justify-between items-center">
            {" "}
            <div className="flex">
              <p className="text-gray-500 ">{data.brand}</p>
            </div>
            <p className="text-gray-500" title={data.description}>
              <StarRating rating={data.rating} totalStars={5} />
            </p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm py-0.5">
            <p
              className="text-gray-500 truncate w-3/4"
              title={data.description}
            >
              {data.description}
            </p>
            <p className="text-error line-through">
              {data.discountPercentage}%
            </p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm py-0.5">
            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary hover:text-primary"
                onClick={() => {
                  navigate(`/productDetails/${data._id}`);
                }}
              >
                View Details
              </button>
            </div>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-textSecondary hover:text-primary border border-primary p-2 rounded-md bg-primary"
                onClick={() => {
                  handleAddToCart(data);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
