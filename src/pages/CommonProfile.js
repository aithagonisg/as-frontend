import React from "react";
import { useReducer } from "react";
import ProfileInfo from "../components/ProfileInfo";
import AddressInfo from "../components/AddressInfo";
import PaymentInfo from "../components/PaymentInfo";

const settings = {
  PROFILE_SETTINGS: "PROFILE_SETTINGS",
  ADDRESS_SETTINGS: "ADDRESS_SETTINGS",
  PAYMENT_SETTINGS: "PAYMENT_SETTINGS",
};

function reducer(state, action) {
  switch (action.type) {
    case "profileSettings":
      return settings.PROFILE_SETTINGS;
    case "addressSettings":
      return settings.ADDRESS_SETTINGS;
    default:
      return settings.PAYMENT_SETTINGS;
  }
}

export default function CommonProfile() {
  const [state, dispatch] = useReducer(reducer, "PROFILE_SETTINGS");
  console.log(state);

  return (
    <div className="flex p-10">
      <div className="w-[28%]">
        <div className="flex flex-col gap-4 text-primary font-bold font-primary text-md">
          <div
            className="cursor-pointer"
            onClick={() => dispatch({ type: "profileSettings" })}
          >
            Profile Settings
          </div>
          <div
            className="cursor-pointer"
            onClick={() => dispatch({ type: "addressSettings" })}
          >
            Address Settings
          </div>
          <div
            className="cursor-pointer"
            onClick={() => dispatch({ type: "paymentSettings" })}
          >
            Payement Settings
          </div>
        </div>
      </div>
      <div className="w-[68%]">
        {state === settings.PROFILE_SETTINGS ? (
          <ProfileInfo />
        ) : state === settings.ADDRESS_SETTINGS ? (
          <AddressInfo />
        ) : (
          <PaymentInfo />
        )}
      </div>
    </div>
  );
}
