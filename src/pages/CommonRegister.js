import React from "react";
import Heading from "../components/commonComponents/Heading";
import Input from "../components/commonComponents/Input";
import Checkbox from "../components/commonComponents/Checkbox";
import { NavLink } from "react-router-dom";
import Button from "../components/commonComponents/Button";

export default function CommonRegister() {
  return (
    <div className="flex justify-between">
      <div className="flex-1 flex justify-center items-center w-full gap-6 flex-col mt-10">
        <Heading level={1} text="Sign Up" boldClass="font-bold" />
        <div className="w-[380px]">
          <Input placeholder="Enter Your Email" type="text" />
        </div>
        <div className="w-[380px] flex gap-1 justify-between">
          <Input placeholder="Enter First Name" type="text" />
          <Input placeholder="Enter Last Name" type="text" />
        </div>
        <div className="w-[380px]">
          <Input placeholder="Enter password" type="password" />
        </div>
        <div className="w-[380px]">
          <Input placeholder="Confirm password" type="password" />
        </div>
        <div className="w-[380px]">
          <Input placeholder="Mobile" type="number" />
        </div>
        <div className="w-[380px] flex justify-between">
          <Checkbox labelText="is Admin" />
          <NavLink to="/login" className="text-primary underline">
            Already Registered ? Please Sign In here
          </NavLink>
        </div>
        <div className="w-[380px]">
          <Button text="Sign Up" bgColor="bg-primary w-[380px] text-center" />
        </div>
      </div>
      <div className="flex-1">
        <img src="./reg-login-logo.png" alt="img" className="w-full h-[106%]" />
      </div>
    </div>
  );
}
