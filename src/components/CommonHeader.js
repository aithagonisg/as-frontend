import React from "react";
import { NavLink } from "react-router-dom";
import { capIcon, profile } from "../assets/svgIcons";

export default function CommonHeader() {
  return (
    <div className="flex h-14 justify-between bg-textPrimary/80 items-center px-4">
      <div className="text-[#fff] bg-[#3871FF] h-14 flex gap-1 justify-center items-center p-2 rounded-md">
        {capIcon}
        <div className="flex flex-col">
          <span className="font-bold leading-4">LEARN</span>
          <span className="text-xs leading-4">Educate people</span>
        </div>
      </div>
      <div className="flex gap-10 font-semibold">
        <NavLink
          to="/componentRights"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-textSecondary border-2 border-textSecondary rounded-md p-2"
                : "text-textSecondary p-2 border-2 border-transparent"
            } `
          }
        >
          ComponentRights
        </NavLink>
        <NavLink
          to="/themeConfig"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-textSecondary border-2 border-textSecondary rounded-md p-2"
                : "text-textSecondary p-2 border-2 border-transparent"
            } `
          }
        >
          ThemeRights
        </NavLink>
      </div>
      <div className="text-secondary">{profile}</div>
    </div>
  );
}
