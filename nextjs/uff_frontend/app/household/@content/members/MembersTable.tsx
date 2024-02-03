"use client";

import { Fragment, useState } from "react";

import FormModal from "@/components/FormModal";
import { TableContainer, TableTitle, Table } from "@/components/Table";
import HighlightButton from "@/components/HighlightButton";
import MemberFields from "./MemberFields";
import useMembersSubset from "@/store/useMembersSubset";

const MembersTable = () => {
  const [openModal, setOpenModal] = useState("");
  const membersSubset = useMembersSubset();

  console.log("membersSubset", membersSubset);

  return (
    <TableContainer>
      <TableTitle
        title="Household Members"
        description="List all household members, starting with the applicant."
      />
      <Table
        tableData={membersSubset}
        onEdit={() => console.log("Edit!")}
        onDelete={() => console.log("Delete!")}
      />
      <HighlightButton
        onClick={() => {
          console.log("Clicked add member, add functionality :)");
        }}
      >
        Add
      </HighlightButton>
    </TableContainer>
  );
};

export default MembersTable;
