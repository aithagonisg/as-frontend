import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { capIcon, cart, hamburger, profile } from "../assets/svgIcons";
import { ProductData } from "../Context";
import ModalPopup from "./commonComponents/ModalPopup";
import Button from "./commonComponents/Button";
import { toUpper } from "../utils/common";
import { useSelector } from "react-redux";
import CartItems from "../pages/userPages/CartItems";

export default function CommonHeader() {
  const { isAccessibleComponent, setIsAuthenticated } = useContext(ProductData);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDesktopProfile, setShowDesktopProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const data = useSelector((state) => state);

  const GetAdminNav = () => (
    <div className="flex md:flex-row flex-col md:gap-10 gap-2  md:font-semibold font-bold">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive
              ? "md:text-textSecondary md:bg-navColor/80 bg-primary text-textSecondary md:border-2 md:border-textSecondary rounded-md p-2"
              : "md:text-textSecondary text-textPrimary p-2 md:border-2 md:border-transparent"
          } `
        }
        onClick={() => setShowMenu(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/componentRights"
        className={({ isActive }) =>
          `${
            isActive
              ? "md:text-textSecondary md:bg-navColor/80 bg-primary text-textSecondary md:border-2 md:border-textSecondary rounded-md p-2"
              : "md:text-textSecondary text-textPrimary p-2 md:border-2 md:border-transparent"
          } `
        }
        onClick={() => setShowMenu(false)}
      >
        ComponentRights
      </NavLink>
      <NavLink
        to="/themeConfig"
        className={({ isActive }) =>
          `${
            isActive
              ? "md:text-textSecondary md:bg-navColor/80 bg-primary text-textSecondary md:border-2 md:border-textSecondary rounded-md p-2"
              : "md:text-textSecondary text-textPrimary p-2 md:border-2 md:border-transparent"
          }`
        }
        onClick={() => setShowMenu(false)}
      >
        ThemeRights
      </NavLink>
    </div>
  );

  const GetNormalUserNav = () => (
    <div className="flex md:flex-row flex-col md:gap-10 gap-2  md:font-semibold font-bold">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive
              ? "md:text-textSecondary md:bg-navColor/80 bg-primary text-textSecondary md:border-2 md:border-textSecondary rounded-md p-2"
              : "md:text-textSecondary text-textPrimary p-2 md:border-2 md:border-transparent"
          } `
        }
        onClick={() => setShowMenu(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `${
            isActive
              ? "md:text-textSecondary md:bg-navColor/80 bg-primary text-textSecondary md:border-2 md:border-textSecondary rounded-md p-2"
              : "md:text-textSecondary text-textPrimary p-2 md:border-2 md:border-transparent"
          } `
        }
        onClick={() => setShowMenu(false)}
      >
        Products
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `${
            isActive
              ? "md:text-textSecondary md:bg-navColor/80 bg-primary text-textSecondary md:border-2 md:border-textSecondary rounded-md p-2"
              : "md:text-textSecondary text-textPrimary p-2 md:border-2 md:border-transparent"
          } `
        }
        onClick={() => setShowMenu(false)}
      >
        Contact Us
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${
            isActive
              ? "md:text-textSecondary md:bg-navColor/80 bg-primary text-textSecondary md:border-2 md:border-textSecondary rounded-md p-2"
              : "md:text-textSecondary text-textPrimary p-2 md:border-2 md:border-transparent"
          } `
        }
        onClick={() => setShowMenu(false)}
      >
        Your Orders
      </NavLink>
    </div>
  );

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      setIsAuthenticated(false);
      navigate("/login");
    }, 1000);
  };
  const email = localStorage.getItem("email");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const ProfileItems = () => (
    <div className="text-textPrimary font-semibold">
      <ul>
        <li className="h-10 flex items-center border-b border-borderColor md:w-40 w-full truncate">
          {toUpper(email)}
        </li>
        <li className="h-10 flex items-center border-b border-borderColor gap-1 md:w-40 w-full truncate">
          <div>{toUpper(firstName)}</div>
          <div>{toUpper(lastName)}</div>
        </li>
        <li
          className="h-10 flex items-center border-b border-borderColor cursor-pointer"
          onClick={() => {
            navigate("/profileSettings");
            setShowProfile(false);
          }}
        >
          Settings
        </li>
        <li
          className="h-10 flex items-center border-b border-borderColor cursor-pointer"
          onClick={handleLogout}
        >
          LogOut
        </li>
      </ul>
    </div>
  );
  return (
    <>
      <div
        className="md:flex h-14 justify-between bg-navColor/80 items-center px-4 hidden"
        id="heading"
      >
        {isAccessibleComponent("headerLogo") ? (
          <div className="text-[#fff] bg-[#3871FF] h-14 flex gap-1 justify-center items-center p-2 rounded-md">
            {capIcon}
            <div className="flex flex-col">
              <span className="font-bold leading-4">LEARN</span>
              <span className="text-xs leading-4">Educate people</span>
            </div>
          </div>
        ) : (
          <div className="w-[125.81px]"></div>
        )}
        {localStorage.getItem("role") === "Admin" ? (
          <GetAdminNav />
        ) : (
          <GetNormalUserNav />
        )}
        <div className="flex gap-4 items-center">
          <div
            className="text-secondary cursor-pointer relative"
            onClick={() => {
              setShowCart(true);
            }}
          >
            <span>{cart}</span>
            <div className="h-6 w-6 rounded-[50%] bg-background absolute text-center -top-3 left-3">
              <span className="text-[red] font-semibold ">
                {data?.cart?.totalItems}
              </span>
            </div>
          </div>
          <div className="text-secondary flex flex-col items-end relative cursor-pointer">
            <div onClick={() => setShowDesktopProfile(!showDesktopProfile)}>
              {profile}
            </div>
            {showDesktopProfile && (
              <div className="top-7 absolute z-10 bg-background shadow border border-borderColor rounded-md w-44 flex justify-center">
                {<ProfileItems />}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden flex h-14 justify-between bg-navColor/80 items-center px-4">
        <Button
          handleClick={() => {
            setShowMenu(!showMenu);
          }}
          leadingIcon={hamburger}
          bgNone={true}
          textColor="text-textSecondary !p-1"
        />
        {isAccessibleComponent("headerLogo") ? (
          <div className="text-[#fff] bg-[#3871FF] h-14 flex gap-1 justify-center items-center p-2 rounded-md">
            {capIcon}
            <div className="flex flex-col">
              <span className="font-bold leading-4">LEARN</span>
              <span className="text-xs leading-4">Educate people</span>
            </div>
          </div>
        ) : (
          <div className="w-[125.81px]"></div>
        )}
        <Button
          handleClick={() => {
            setShowProfile(!showProfile);
          }}
          leadingIcon={profile}
          bgNone={true}
          textColor="text-textSecondary !p-1 cursor-pointer"
        />
        <ModalPopup
          isOpen={showMenu}
          heading="NavItems"
          handleClose={() => {
            setShowMenu(!showMenu);
          }}
        >
          <GetAdminNav />
        </ModalPopup>
        <ModalPopup
          isOpen={showProfile}
          heading="ProfileInfo"
          handleClose={() => {
            setShowProfile(!showProfile);
          }}
        >
          <ProfileItems />
        </ModalPopup>
      </div>
      {showCart && <CartItems setShowCart={setShowCart} />}
    </>
  );
}
