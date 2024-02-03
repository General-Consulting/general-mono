import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SidebarNavigation from "./SidebarNavigation";
import SidebarProfile from "./SidebarProfile";

const DesktopSidebar = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <SidebarNavigation />
        <SidebarProfile />
      </div>
    </div>
  );
};

export default DesktopSidebar;
