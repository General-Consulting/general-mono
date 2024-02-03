"use client";

import { useState } from "react";

import FormModal from "@/components/FormModal";
import { TableContainer, TableTitle, Table } from "@/components/Table";
import HighlightButton from "@/components/HighlightButton";
import useTransformedCollection from "@/store/useCollectionSubset";
import { Collection } from "@/types";
import useCollectionSubset from "@/store/useCollectionSubset";

interface CollectionTableProps {
  collectionName: Collection;
  memberId: string;
}

const CollectionTable = ({
  collectionName,
  memberId,
}: CollectionTableProps) => {
  const [openModal, setOpenModal] = useState("");

  const collectionSubset = useCollectionSubset({ memberId, collectionName });

  console.log("In CollectionTable...");
  console.log("collectionName", collectionName);
  console.log("memberId", memberId);
  console.log("collectionSubset", collectionSubset);

  return (
    <TableContainer>
      <TableTitle
        title={collectionName}
        description={`List all ${collectionName} for this household member.`}
      />
      <Table
        tableData={collectionSubset}
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

export default CollectionTable;
