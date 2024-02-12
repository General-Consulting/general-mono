'use client'

import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode,
  modal: ReactNode
}

const Layout = ({ 
  children, 
  modal 
}: LayoutProps) => {
  console.log('In the members layout')
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout