import React from "react";
import Heading from "../components/commonComponents/Heading";
import Input from "../components/commonComponents/Input";
import { NavLink } from "react-router-dom";
import Button from "../components/commonComponents/Button";

export default function CommonLogin() {
  return (
    <div className="flex justify-between">
      <div className="flex-1 flex justify-center items-center w-full gap-6 flex-col mt-10">
        <Heading level={1} text="Sign In" boldClass="font-bold" />
        <div className="w-[380px]">
          <Input placeholder="Enter Your Email" type="text" />
        </div>
        <div className="w-[380px]">
          <Input placeholder="Enter password" type="password" />
        </div>

        <div className="w-[380px]">
          <Button text="Sign In" bgColor="bg-primary w-[380px] text-center" />
        </div>
        <div className="w-[380px] flex justify-end">
          <NavLink to="/register" className="text-primary underline">
            Not yet Registered Please Register here
          </NavLink>
        </div>
      </div>
      <div className="flex-1">
        <img src="./reg-login-logo.png" alt="img" className="w-full h-[114%]" />
      </div>
    </div>
  );
}
