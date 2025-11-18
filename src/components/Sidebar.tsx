"use client";

import { useState } from "react";
import Link from "next/link";
import { sidebarItems } from "@/utils/constants/sidebarItems";
import { MdMenu } from "react-icons/md";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const doctorMenu = sidebarItems.find((s) => s.type === "Doctor");

  return (
    <div
      className={`
        fixed left-0 top-16 border-r bg-gray-100
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        h-[calc(100vh-64px)]
        overflow-y-auto
      `}
    >
      {/* Toggle Button */}
      <button
        className="p-3 hover:bg-gray-200 w-full text-left"
        onClick={() => setCollapsed(!collapsed)}
      >
        <MdMenu size={24} />
      </button>

      {/* Menu Title */}
      {!collapsed && (
        <h2 className="font-bold text-lg px-4 mb-4">Doctor Menu</h2>
      )}

      {/* Menu Items */}
      <ul className="space-y-2 px-2">
        {doctorMenu?.item.map((menu) => (
          <li key={menu.path}>
            <Link
              href={menu.path}
              className={`
                flex items-center gap-3 p-2 rounded hover:bg-gray-200
                ${collapsed ? "justify-center" : ""}
              `}
            >
              {menu.icon && <menu.icon size={22} />}
              {!collapsed && <span>{menu.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
