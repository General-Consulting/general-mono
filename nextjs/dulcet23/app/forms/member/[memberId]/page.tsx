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

  console.log('Inside the forms/member/memberId route')

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
