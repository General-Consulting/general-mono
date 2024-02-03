// SidebarProfile.tsx
import Image from "next/image";

const SidebarProfile = () => {
  return (
    <li className="-mx-6 mt-auto">
      <a
        href="#"
        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
      >
        <Image
          width={100}
          height={100}
          className="h-8 w-8 rounded-full bg-gray-50"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
        />
        <span className="sr-only">Your profile</span>
        <span aria-hidden="true">Tom Cook</span>
      </a>
    </li>
  );
};

export default SidebarProfile;
