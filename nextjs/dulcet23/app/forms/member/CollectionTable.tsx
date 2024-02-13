'use client'

import { useState } from "react"

import { 
  TableContainer,
  TableTitle,
  Table,
} from "@/components/Table"
import HighlightButton from "@/components/HighlightButton"
import useCollectionSubset from "@/store/useCollectionSubset"
import CollectionLinkGenerator from "../../../utils/CollectionLinkGenerator"

import { Collection } from "@/types"


interface CollectionTableProps {
  collectionName: Collection
  memberId: string
}

const CollectionTable = ({
  collectionName,
  memberId
}: CollectionTableProps) => {
  const collectionSubset = useCollectionSubset({ memberId, collectionName })

  const linkGenerator = new CollectionLinkGenerator(memberId, collectionName)
  
  return (
    <TableContainer>
      <TableTitle
        title={collectionName}
        description={`List all ${collectionName} for this household member.`}
      />
      <Table
        tableData={collectionSubset}
        linkGenerator={linkGenerator}
      />
      <HighlightButton
        onClick={() => {
          console.log('Clicked add member, add functionality :)')
        }} 
      >
        Add
      </HighlightButton>
    </TableContainer>

  )

}

export default CollectionTable

