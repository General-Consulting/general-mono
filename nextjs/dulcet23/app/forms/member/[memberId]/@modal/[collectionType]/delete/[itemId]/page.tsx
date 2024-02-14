'use client'; 

import { useParams, useRouter } from 'next/navigation'

import DeleteCollectionItem from './DeleteCollectionItem';
import Modal from '@/components/Modal';

const Page = () => {
  const router = useRouter()
  const { 
    memberId, 
    collectionType,
    itemId
  } = useParams<{ 
    memberId: string, 
    collectionType: 'income' | 'assets',
    itemId: string 
  }>()
  
  const modalPath = `/forms/member/${memberId}/${collectionType}/edit/${itemId}`

  const handleCancel = () => router.push(`/forms/member/${memberId}`)

  return (
    <Modal 
      title="Delete Item"
      onCancel={handleCancel}
      modalPath={modalPath}
      showTrashIcon
    >
      <DeleteCollectionItem
        collectionType={collectionType}
        itemId={itemId} 
        memberId={memberId}
        onCancel={handleCancel} 
      />
    </Modal>

  );
}

export default Page


