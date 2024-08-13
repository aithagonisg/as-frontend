import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/productService";
import { END_POINT } from "../../constants";

export default function ProductDetails() {
  const { id } = useParams();
  const [porductDetails, setProductDetails] = useState({});

  useEffect(() => {
    getProduct(id).then((res) => setProductDetails(res));
  }, [id]);

  const getDiscountPrice = (actualPrice, discount) => {
    const discountPrice = actualPrice - (actualPrice * discount) / 100;
    return discountPrice.toFixed();
  };

  return (
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-5 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap ">
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 h-[430px]"
            src={`${END_POINT}${porductDetails.image_url}`}
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-textPrimary/100 tracking-widest">
              {porductDetails.brand}
            </h2>
            <h1 class="text-textPrimary text-3xl title-font font-medium mb-1">
              {porductDetails.title}
            </h1>
            <div class="flex mb-4">
              <span class="flex items-center">
                Rating: {porductDetails.rating}
              </span>
            </div>
            <p class="leading-relaxed">{porductDetails.description}</p>
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div class="flex gap-1">
                <span class="mr-3">Color</span>
                {porductDetails?.colors?.map((color) => (
                  <button
                    class="border-2 rounded-full w-6 h-6 focus:outline-none"
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></button>
                ))}
              </div>
              {porductDetails?.sizes?.length > 0 && (
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative">
                    <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      {porductDetails?.sizes?.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-between">
              <div className="flex my-2 flex-col gap-2">
                <div>
                  In Stock:{" "}
                  <span className="font-medium">{porductDetails.stock}</span>
                </div>
                {porductDetails.discountPercentage && (
                  <div>
                    Discount:{" "}
                    <span className="font-medium">
                      {porductDetails.discountPercentage} %
                    </span>
                  </div>
                )}
              </div>
              <span class="title-font text-textPrimary flex flex-col gap-1">
                <span>
                  <span>Total Price: </span>
                  <span className="price-container">
                    <span className="price">${porductDetails.price}</span>
                  </span>
                </span>
                {porductDetails.discountPercentage && (
                  <span>
                    <span>Discount Price:</span>
                    <span className="text-xl font-medium">
                      ${" "}
                      {getDiscountPrice(
                        porductDetails.price,
                        porductDetails.discountPercentage
                      )}
                    </span>
                  </span>
                )}
              </span>
            </div>

            <div class="flex">
              <button class="flex ml-auto text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary/100 rounded">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
