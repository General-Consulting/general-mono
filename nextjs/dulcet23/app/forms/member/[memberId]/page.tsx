'use client'

import { useParams } from 'next/navigation';
import CollectionTable from "../CollectionTable"

interface PageComponentProps {
  params: { id: string }
}


// const PageComponent = ({ 
//   params 
// }: PageComponentProps) => {
const PageComponent = () => {
  const { memberId } = useParams<{memberId: string }>();

  return (
    <>
      <CollectionTable 
        collectionName="income"
        memberId={memberId}
      />

    </>
  )
}

export default PageComponent
