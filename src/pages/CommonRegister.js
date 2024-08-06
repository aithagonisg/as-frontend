import React, { useContext, useState } from "react";
import Heading from "../components/commonComponents/Heading";
import Input from "../components/commonComponents/Input";
import Checkbox from "../components/commonComponents/Checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/commonComponents/Button";
import { ProductData } from "../Context";
import { registerUser } from "../services/userServices";

export default function CommonRegister() {
  const [registerInfo, setRegisterInfo] = useState({});

  const navigate = useNavigate();

  const { handleToast, setIsAuthenticated } = useContext(ProductData);

  const handleRegisterInfo = (e) => {
    console.log(e.target.id);

    if (e.target.id === "role") {
      setRegisterInfo({
        ...registerInfo,
        [e.target.id]: e.target.checked ? true : false,
      });
    }
    setRegisterInfo({ ...registerInfo, [e.target.id]: e.target.value });
  };

  const handleRegister = () => {
    if (registerInfo.password === registerInfo.confirmPassword) {
      const payload = {
        email: registerInfo.email,
        password: registerInfo.password,
        firstName: registerInfo.firstName,
        lastName: registerInfo.lastName,
        mobile: registerInfo.mobile,
        role: registerInfo.role ? "Admin" : "User",
      };
      registerUser(payload).then((res) => {
        Object.keys(res).map((item) => {
          localStorage.setItem(item, res[item]);
        });
        setIsAuthenticated(true);
        setTimeout(() => {
          if (res.role === "Admin") {
            navigate("/componentRights");
          } else {
            navigate("/");
          }
        });
      }, 2000);
    } else {
      handleToast("password is not matching please check", "error");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1 flex justify-center items-center w-full gap-6 flex-col mt-10">
        <Heading level={1} text="Sign Up" boldClass="font-bold" />
        <div className="w-[380px]">
          <Input
            placeholder="Enter Your Email"
            type="text"
            id="email"
            onChange={handleRegisterInfo}
          />
        </div>
        <div className="w-[380px] flex gap-1 justify-between">
          <Input
            placeholder="Enter First Name"
            type="text"
            id="firstName"
            onChange={handleRegisterInfo}
          />
          <Input
            placeholder="Enter Last Name"
            type="text"
            id="lastName"
            onChange={handleRegisterInfo}
          />
        </div>
        <div className="w-[380px]">
          <Input
            placeholder="Enter password"
            type="password"
            id="password"
            onChange={handleRegisterInfo}
          />
        </div>
        <div className="w-[380px]">
          <Input
            placeholder="Confirm password"
            type="password"
            id="confirmPassword"
            onChange={handleRegisterInfo}
          />
        </div>
        <div className="w-[380px]">
          <Input
            placeholder="Mobile"
            type="number"
            id="mobile"
            onChange={handleRegisterInfo}
          />
        </div>
        <div className="w-[380px] flex justify-between">
          <Checkbox
            labelText="is Admin"
            id="role"
            handleCheckbox={handleRegisterInfo}
            checked={registerInfo["role"]}
          />
          <NavLink to="/login" className="text-primary underline">
            Already Registered ? Please Sign In here
          </NavLink>
        </div>
        <div className="w-[380px]">
          <Button
            text="Sign Up"
            bgColor="bg-primary w-[380px] text-center"
            handleClick={handleRegister}
          />
        </div>
      </div>
      <div className="flex-1">
        <img src="./reg-login-logo.png" alt="img" className="w-full h-[106%]" />
      </div>
    </div>
  );
}
