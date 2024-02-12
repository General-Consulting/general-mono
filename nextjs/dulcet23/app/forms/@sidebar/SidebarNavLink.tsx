'use client'

import clsx from "clsx"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { ComponentType, ReactNode } from "react"


interface SidebarNavLinkProps {
  href: Route<string> | URL
  name: ReactNode
  // Icon?: ComponentType<{ className: string, 'aria-hidden': string }>
}

const SidebarNavLink = ({
  href,
  name,
  // Icon
}: SidebarNavLinkProps) => {
  const pathname = usePathname();
  const current = pathname === href.toString();


  return (
    <Link 
      href={href} 
      className={clsx(
        // Styles independent of current status
        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',

        // Styles dependent on whether link is current or not
        current 
          ? 'bg-gray-50 text-indigo-600' 
          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
      
    )}>
      {/* {Icon && (<Icon 
        aria-hidden="true"
        className={clsx(
          // Styles independent of current status
          'h-6 w-6 shrink-0',

          // Styles dependent on whether link is current or not
        current 
          ? 'text-indigo-600' 
          : 'text-gray-400 group-hover:text-indigo-600',
        )} 
      />)} */}
      {name}
    </Link>
  )
}

export default SidebarNavLink