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
          <div className="flex justify-between">
            <div>
              <Heading
                level={2}
                boldClass="font-bold truncate w-[180px]"
                text={data.title}
              />
              <div className="flex gap-2 items-center">
                <Label level={3} text={data.category} />
                <Button
                  text="view Details"
                  bgNone
                  textColor="text-primary underline"
                  handleClick={() => {
                    navigate(`/productDetails/${data._id}`);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-end items-end gap-1">
              <Heading
                level={2}
                boldClass="font-bold"
                text={`$${data.price}`}
              />
              <Button
                text="Add To Cart"
                bgColor="bg-primary"
                handleClick={() => {
                  handleAddToCart(data);
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
