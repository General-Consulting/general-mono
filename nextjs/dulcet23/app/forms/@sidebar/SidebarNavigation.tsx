'use client'

// SidebarNavigation.tsx
import { Fragment } from "react"
import { 
  HomeIcon, 
  UsersIcon,
  UserIcon, 
  FolderIcon, 
  CalendarIcon, 
  DocumentDuplicateIcon, 
  ChartPieIcon 
} from '@heroicons/react/24/outline';

import SidebarNavLink from "./SidebarNavLink"
import useMembersSubset from "@/store/useMembersSubset";
import { MemberSubset } from "@/types";

const ListDividerLine = () => {
  return (
    <li>
      <hr className="bg-gray-300" />
    </li>
  )
}

// const getInitialWithPeriod = (str: string) => {
//   return str.charAt(0) + '.';
// }


const SidebarNavigation = () => {
  const members = useMembersSubset()

  const createMemberNode = (member: MemberSubset) => {
    const { firstName, lastName } = member
    // const lastInitial = lastName.charAt(0) + '.'

    return (
      <>
        {firstName} {lastName}
      </>
    )
  }

  return (
    <Fragment>
      <div className="flex h-16 shrink-0 items-center">
        {/* Logo Image */}
        {/* Add your Image component here */}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul 
          role="list" 
          className="flex flex-1 flex-col gap-y-4"
        >
          <SidebarNavLink
            key="members-link"
            name="Household"
            href="/forms/members"
            // Icon={HomeIcon}
          />

          <ListDividerLine />

          {members.map((member, index) => (
            <SidebarNavLink
              key={`member-${index}`}
              name={createMemberNode(member)}
              href={`/forms/member/${member.id}`}
              // Icon={UserIcon}
            />
          ))}
        </ul>
      </nav>
    </Fragment>
  );
};

export default SidebarNavigation;
