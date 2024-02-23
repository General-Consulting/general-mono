'use client'; 

import { useParams, useRouter } from 'next/navigation'

import AddCollectionItem from './AddCollectionItem';
import Modal from '@/components/Modal';
import isValidCollectionName from '@/utils/isValidCollectionName';

const Page = () => {
  const router = useRouter()
  const { 
    memberId, 
    collectionName,
  } = useParams<{ memberId: string, collectionName: string }>()
  
  const isCollectionNameValid = isValidCollectionName(collectionName)


  
  const modalTitle = `Add item to ${collectionName}`
  
  const modalPath = `/forms/member/${memberId}/income/add`

  const handleCancel = () => router.push(`/forms/member/${memberId}`)

  if (!isCollectionNameValid) return null

  return (
    <Modal 
      title={modalTitle}
      onCancel={handleCancel}
      modalPath={modalPath}
      showEditIcon
    >
      <AddCollectionItem
        memberId={memberId}
        collectionName={collectionName} 
        onCancel={handleCancel} 
      />
    </Modal>

  );
}

export default Page


