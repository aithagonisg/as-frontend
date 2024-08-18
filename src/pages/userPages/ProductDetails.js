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
      setSelectedSize(res?.sizes[0] || "");
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

  const handleSelectSize = (item) => {
    setSelectedSize(item);
  };
  console.log(porductDetails, selectedSize);

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
            <div className="flex justify-between">
              <h3 class="text-textPrimary title-font font-medium mb-1">
                {porductDetails.title}
              </h3>
              <span class="flex gap-1">
                <span className="text-error">
                  <span>
                    <span className="line-through text-error">
                      ${porductDetails.price}
                    </span>
                  </span>
                </span>
                {porductDetails.discountPercentage && (
                  <span>
                    <span className="font-medium">
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

            <h4 class="text-sm title-font text-gray-500 tracking-widest">
              {porductDetails.brand}
            </h4>

            <div class="flex my-4 text-gray-500">
              <span class="flex items-center gap-2">
                <div>{porductDetails.rating} </div>
                <StarRating totalStars={5} rating={porductDetails.rating} />
              </span>
            </div>
            <p class="leading-relaxed text-gray-500">
              {porductDetails.description}
            </p>
            <div class="flex flex-col gap-1">
              <div class="mb-1 font-semibold">Colors</div>
              <div class="flex gap-1">
                {porductDetails?.colors?.map((color) => (
                  <span
                    className="w-12 h-12 border-2 rounded-full p-2 box-border"
                    style={{
                      borderColor:
                        selectedColor === color.toLowerCase()
                          ? `${
                              color.toLowerCase() === "white"
                                ? "purple"
                                : color.toLowerCase()
                            }`
                          : "",
                    }}
                  >
                    <button
                      className={`w-10 h-10 rounded-full relative -top-[6px] right-[6px]`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                      onClick={() => {
                        setSelectedColor(color.toLowerCase());
                      }}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-1">
              <span class="mb-1 font-semibold">Sizes</span>
              {porductDetails?.sizes?.length > 0 && (
                <div class="flex items-center gap-2">
                  {porductDetails?.sizes?.map((item) => (
                    <div
                      className={`cursor-pointer w-10 h-10 rounded-md border-2 flex justify-center items-center font-semibold ${
                        selectedSize === item
                          ? "bg-primary text-textSecondary"
                          : ""
                      }`}
                      onClick={() => handleSelectSize(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-3 border-b-2 border-gray-200 mb-3 text-gray-500"></div>
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
