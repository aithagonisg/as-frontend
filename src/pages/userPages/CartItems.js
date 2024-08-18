import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { END_POINT } from "../../constants";
import { trashIcon } from "../../assets/svgIcons";
import Button from "../../components/commonComponents/Button";
import { useNavigate } from "react-router-dom";
import { removeCartItems } from "../../services/productService";
import { removeItem } from "../../redux/cartSlice";

export default function CartItems({ setShowCart }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const products = cart?.cart;
  const totalAmount = products.reduce((acc, cur) => acc + cur.price, 0);

  const handleRemoveFromCart = (productId) => {
    removeCartItems(productId).then((res) => {
      dispatch(removeItem({ id: productId }));
    });
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <div className="pointer-events-auto w-screen max-w-full">
              <div className="flex h-full flex-col overflow-y-scroll bg-background shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-textPrimary"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => {
                          setShowCart(false);
                        }}
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-borderColor"
                      >
                        {products.map((item) => (
                          <li className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-borderColor">
                              <img
                                src={`${END_POINT}${item.image_url}`}
                                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-textPrimary">
                                  <h3>{item.title}</h3>
                                  <p className="ml-4">${item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.colors} | {item.sizes}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  {item.description}
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-primary hover:text-primary"
                                    onClick={() =>
                                      handleRemoveFromCart(item._id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-borderColor px-6 py-3 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-textPrimary">
                    <p>Subtotal</p>
                    <p>${totalAmount}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6 flex ">
                    <Button
                      text="Checkout"
                      bgColor="bg-primary w-full"
                      textColor="text-textSecondary"
                      handleClick={() => {
                        setShowCart(false);
                        navigate("/checkout");
                      }}
                    />
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        type="button"
                        className="font-medium text-primary hover:primary pl-2"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
