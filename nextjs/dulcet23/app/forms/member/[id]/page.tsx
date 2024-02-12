'use client'

import { useParams } from 'next/navigation';
import CollectionTable from "./CollectionTable"

interface PageComponentProps {
  params: { id: string }
}


// const PageComponent = ({ 
//   params 
// }: PageComponentProps) => {
const PageComponent = () => {
  const { id } = useParams<{id: string }>();

  return (
    <>
      <CollectionTable 
        collectionName="income"
        memberId={id}
      />

    </>
  )
}

export default PageComponent
