import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { capIcon, hamburger, profile } from "../assets/svgIcons";
import { ProductData } from "../Context";
import ModalPopup from "./commonComponents/ModalPopup";
import Button from "./commonComponents/Button";
import Dropdown from "./commonComponents/Dropdown";

export default function CommonHeader() {
  const { isAccessibleComponent } = useContext(ProductData);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const GetAdminNav = () => (
    <div className="flex md:flex-row flex-col md:gap-10 gap-2  md:font-semibold font-bold">
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
      {isAccessibleComponent("themeNavigation") ? (
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
      ) : (
        <div></div>
      )}
    </div>
  );

  const ProfileItems = () => (
    <div className="text-textPrimary font-semibold">
      <ul>
        <li className="h-10 flex items-center border-b border-borderColor">
          User Name
        </li>
        <li className="h-10 flex items-center border-b border-borderColor">
          Update Profile
        </li>
        <li className="h-10 flex items-center border-b border-borderColor">
          User Name
        </li>
      </ul>
    </div>
  );
  return (
    <>
      <div className="md:flex h-14 justify-between bg-navColor/80 items-center px-4 hidden">
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
        <GetAdminNav />
        <div className="text-secondary flex flex-col items-end">
          <Dropdown heading={profile}>
            <div className="z-50 bg-background divide-y rounded-md shadow w-40 p-2 border-borderColor absolute top-14">
              <ProfileItems />
            </div>
          </Dropdown>
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
          textColor="text-textSecondary !p-1"
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
    </>
  );
}
