'use client'

import { ReactNode } from "react"

interface LayoutProps {
  sidebar: ReactNode,
  children: ReactNode
}

const Layout = ({ 
  sidebar, 
  children 
}: LayoutProps) => {
  return (
    <div>
      {sidebar}
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout