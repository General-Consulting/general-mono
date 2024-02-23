'use client'; 

import { useParams, useRouter } from 'next/navigation'

import DeleteCollectionItem from './DeleteCollectionItem';
import Modal from '@/components/Modal';
import isValidCollectionName from '@/utils/isValidCollectionName';

const Page = () => {
  const router = useRouter()
  const { 
    memberId, 
    collectionName,
    collectionItemId
  } = useParams<{ 
    memberId: string, 
    collectionName: string,
    collectionItemId: string 
  }>()
  
  const isCollectionNameValid = isValidCollectionName(collectionName)

  const modalPath = `/forms/member/${memberId}/${collectionName}/delete/${itemId}`

  const handleCancel = () => router.push(`/forms/member/${memberId}`)

  if (!isCollectionNameValid) return null

  return (
    <Modal 
      title="Delete Item"
      onCancel={handleCancel}
      modalPath={modalPath}
      showTrashIcon
    >
      <DeleteCollectionItem
        collectionName={collectionName}
        collectionItemId={collectionItemId} 
        memberId={memberId}
        onCancel={handleCancel} 
      />
    </Modal>

  );
}

export default Page


