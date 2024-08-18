import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { cart } = useSelector((state) => state);

  const productsPrice = cart.cart.reduce((acc, curr) => acc + curr.price, 0);

  const getDiscountPrice = (actualPrice, discount) => {
    console.log(actualPrice, discount);

    const discountPrice = actualPrice - (actualPrice * discount) / 100;
    return discountPrice.toFixed();
  };
  let safeAmount = 0;
  cart.cart.forEach((element) => {
    safeAmount += parseInt(
      getDiscountPrice(element.price, element.discountPercentage)
    );
  });
  const savingsAmount = productsPrice - safeAmount;

  const storePickUp = 99;
  const tax = 199;
  const totalProductsCost = productsPrice + tax + storePickUp - savingsAmount;
  return (
    <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16 px-5">
      <div class="min-w-0 flex-1 space-y-8">
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Delivery Details
          </h2>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input
                  id="dhl"
                  aria-describedby="dhl-text"
                  type="radio"
                  name="delivery-method"
                  value=""
                  class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  checked
                />
              </div>
              <div class="ms-4 text-sm">
                <label
                  for="dhl"
                  class="font-medium leading-none text-gray-900 dark:text-white"
                >
                  $15 - DHL Fast Delivery{" "}
                </label>
                <p
                  id="dhl-text"
                  class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                >
                  Get it by Tommorow
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Payment
          </h3>
        </div>
      </div>

      <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
        <div class="flow-root">
          <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Subtotal
              </dt>
              <dd class="text-base font-medium text-gray-900 dark:text-white">
                ${productsPrice}
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Savings
              </dt>
              <dd class="text-base font-medium text-green-500">
                {savingsAmount}
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Store Pickup
              </dt>
              <dd class="text-base font-medium text-gray-900 dark:text-white">
                ${storePickUp}
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Tax
              </dt>
              <dd class="text-base font-medium text-gray-900 dark:text-white">
                ${tax}
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-bold text-gray-900 dark:text-white">
                Total
              </dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">
                ${totalProductsCost}
              </dd>
            </dl>
          </div>
        </div>

        <div class="space-y-3">
          <button
            type="submit"
            class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Proceed to Payment
          </button>

          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            One or more items in your cart require an account.{" "}
            <a
              href="#"
              title=""
              class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
            >
              Sign in or create an account now.
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
