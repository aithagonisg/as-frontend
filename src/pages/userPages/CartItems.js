import React from "react";
import { useSelector } from "react-redux";
import { END_POINT } from "../../constants";
import { trashIcon } from "../../assets/svgIcons";

export default function CartItems() {
  const { cart } = useSelector((state) => state);
  const products = cart?.cart;
  return (
    <>
      <div className="p-10 pb-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="w-52">Pro Image</div>
          <div className="w-52">Title</div>
          <div className="w-52">Description</div>
          <div className="w-52 text-center">price</div>
          <div className="w-52">Action</div>
        </div>
        {products.map((item) => (
          <div className="flex justify-between">
            <div className="h-10 overflow-hidden w-52">
              <img
                src={`${END_POINT}${item.image_url}`}
                width="52"
                height="30"
              />
            </div>
            <div className="w-52 truncate">{item.title}</div>
            <div className="w-52 truncate">{item.description}</div>
            <div className="w-52 text-center">{item.price}</div>
            <div className="w-52">{trashIcon}</div>
          </div>
        ))}
      </div>
      <div className="py-1 pr-96 flex justify-end">
        <span>Total Amount:</span>
        <span>$ {}</span>
      </div>
    </>
  );
}
