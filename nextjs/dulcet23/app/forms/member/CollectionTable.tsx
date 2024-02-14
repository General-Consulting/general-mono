'use client'

import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const collectionSubset = useCollectionSubset({ memberId, collectionName })

  const collectionLinkGenerator = new CollectionLinkGenerator(memberId, collectionName)
  
  // Handle if member clicks "Add" button
  const addCollectionItemLink = collectionLinkGenerator.createAddLink()
  const handleAdd = () => router.push(addCollectionItemLink)

  return (
    <TableContainer>
      <TableTitle
        title={collectionName}
        description={`List all ${collectionName} for this household member.`}
      />
      <Table
        tableData={collectionSubset}
        linkGenerator={collectionLinkGenerator}
      />
      <HighlightButton onClick={handleAdd}>
        Add
      </HighlightButton>
    </TableContainer>

  )

}

export default CollectionTable

