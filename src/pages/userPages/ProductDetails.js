import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCartItems, getProduct } from "../../services/productService";
import { END_POINT } from "../../constants";
import { useDispatch } from "react-redux";
import Button from "../../components/commonComponents/Button";
import { addItem } from "../../redux/cartSlice";
import StarRating from "../../components/StarRating";

export default function ProductDetails() {
  const { id } = useParams();
  const [porductDetails, setProductDetails] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    getProduct(id).then((res) => {
      setProductDetails(res);
      setSelectedColor(res?.colors[0]?.toLowerCase() || "");
      setSelectedSize(res?.sizes[0]?.toLowerCase() || "");
    });
  }, [id]);

  const getDiscountPrice = (actualPrice, discount) => {
    const discountPrice = actualPrice - (actualPrice * discount) / 100;
    return discountPrice.toFixed();
  };

  const dispatch = useDispatch();

  const handleAddToCart = (productData) => {
    const filteredProduct = {
      ...productData,
      colors: selectedColor || "",
      sizes: selectedSize || "",
    };
    addCartItems(filteredProduct)
      .then((res) => {
        dispatch(addItem(filteredProduct));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectSize = (e) => {
    setSelectedSize(e.target.value);
  };
  return (
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-5 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap ">
          <img
            alt="ecommerce"
            class="w-[300px] object-cover object-center rounded border border-gray-200 h-[395px]"
            src={`${END_POINT}${porductDetails.image_url}`}
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h3 class="text-textPrimary title-font font-medium mb-1">
              {porductDetails.title}
            </h3>
            <h4 class="text-sm title-font text-gray-500 tracking-widest">
              {porductDetails.brand}
            </h4>

            <div class="flex my-4 text-gray-500">
              <span class="flex items-center gap-2">
                <div>Rating: </div>
                <StarRating totalStars={5} rating={porductDetails.rating} />
              </span>
            </div>
            <p class="leading-relaxed text-gray-500">
              {porductDetails.description}
            </p>
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5 text-gray-500">
              <div class="flex gap-1">
                <span class="mr-3">Color</span>
                {porductDetails?.colors?.map((color) => (
                  <button
                    class={`border-2 w-6 h-6 focus:outline-none ${
                      selectedColor === color.toLowerCase()
                        ? ""
                        : "rounded-full"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => {
                      setSelectedColor(color.toLowerCase());
                    }}
                  ></button>
                ))}
              </div>
              {porductDetails?.sizes?.length > 0 && (
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative">
                    <select
                      value={selectedSize}
                      onChange={handleSelectSize}
                      class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                    >
                      {porductDetails?.sizes?.map((item) => (
                        <option value={item}>{item}</option>
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
            <div className="flex gap-2 justify-between text-gray-500">
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
              <span class="title-font text-gray-500 flex flex-col gap-1">
                <span className="text-error">
                  <span>Total Price: </span>
                  <span>
                    <span className="line-through text-error">
                      ${porductDetails.price}
                    </span>
                  </span>
                </span>
                {porductDetails.discountPercentage && (
                  <span>
                    <span>Discount Price: </span>
                    <span className="text-xl font-medium">
                      $
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
              <Button
                text="Add To Cart"
                bgColor="bg-primary"
                handleClick={() => {
                  handleAddToCart(porductDetails);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
