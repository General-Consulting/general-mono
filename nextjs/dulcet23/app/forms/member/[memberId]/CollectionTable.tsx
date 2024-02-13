'use client'

import { useState } from "react"

import { 
  TableContainer,
  TableTitle,
  Table,
} from "@/components/Table"
import HighlightButton from "@/components/HighlightButton"
import useCollectionSubset from "@/store/useCollectionSubset"
import LinkGenerator from "@/utils/LinkGenerator"

import { Collection } from "@/types"


interface CollectionTableProps {
  collectionName: Collection
  memberId: string
}

const CollectionTable = ({
  collectionName,
  memberId
}: CollectionTableProps) => {
  const [ openModal, setOpenModal ] = useState('')


  const collectionSubset = useCollectionSubset({ memberId, collectionName })


  const linkGenerator = new LinkGenerator()
  

  return (
    <TableContainer>
      <TableTitle
        title={collectionName}
        description={`List all ${collectionName} for this household member.`}
      />
      <Table
        tableData={collectionSubset}
        linkGenerator={() => console.log('Edit!')}

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

