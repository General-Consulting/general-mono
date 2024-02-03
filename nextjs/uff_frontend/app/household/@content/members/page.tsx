"use client";

import useMembers from "@/store/useMembersSubset";
import MembersTable from "./MembersTable";

const PageComponent = () => {
  const members = useMembers();

  console.log("members", members);

  return (
    <>
      <h1 className="text-3xl">Rendered the household/members page</h1>
      <div>Add navigation</div>
      <MembersTable />
    </>
  );
};

export default PageComponent;
