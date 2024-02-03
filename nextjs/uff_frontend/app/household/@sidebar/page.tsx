"use client";

import { useState } from "react";

import DesktopSidebar from "./DesktopSidebar";
import MobileTopBar from "./MenuTopBar";
import MobileSidebar from "./MobileSidebar";

const PageComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Static sidebar for desktop */}
      <DesktopSidebar />

      {/* Mobile top bar */}
      <MobileTopBar setSidebarOpen={setSidebarOpen} />
    </>
  );
};

export default PageComponent;
