import React, { useContext, useState } from "react";
import Heading from "../components/commonComponents/Heading";
import Input from "../components/commonComponents/Input";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/commonComponents/Button";
import { loginUser } from "../services/userServices";
import { ProductData } from "../Context";

export default function CommonLogin() {
  const [loginInfo, setLoginInfo] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated, handleToast } = useContext(ProductData);
  const handleLoginInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.id]: e.target.value });
  };

  const handleLogin = () => {
    loginUser(loginInfo).then((res) => {
      if (res.error) {
        handleToast(res.error, "error");
      } else {
        Object.keys(res).map((item) => {
          if (item === "authToken" || item === "userId") {
            localStorage.setItem(item, res[item]);
          }
        });
        setTimeout(() => {
          setIsAuthenticated(true);
          navigate("/");
        }, 2000);
      }
    });
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1 flex justify-center items-center w-full gap-6 flex-col mt-10">
        <Heading level={1} text="Sign In" boldClass="font-bold" />
        <div className="w-[380px]">
          <Input
            placeholder="Enter Your Email"
            type="text"
            id="email"
            onChange={handleLoginInfo}
          />
        </div>
        <div className="w-[380px]">
          <Input
            placeholder="Enter password"
            type="password"
            id="password"
            onChange={handleLoginInfo}
          />
        </div>

        <div className="w-[380px]">
          <Button
            text="Sign In"
            bgColor="bg-primary w-[380px] text-center"
            handleClick={handleLogin}
          />
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
