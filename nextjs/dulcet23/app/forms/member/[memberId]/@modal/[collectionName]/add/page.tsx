'use client'; 

import { useParams, useRouter } from 'next/navigation'

import AddCollectionItem from './AddCollectionItem';
import Modal from '@/components/Modal';
import isValidCollectionName from '@/utils/isValidCollectionName';

const Page = () => {
  const router = useRouter()
  const { 
    memberId, 
    collectionName: collectionNameURL,
  } = useParams<{ memberId: string, collectionName: string }>()
  
  const isCollectionNameValid = isValidCollectionName(collectionNameURL)


  
  const modalTitle = `Add item to ${collectionType}`
  
  const modalPath = `/forms/member/${memberId}/income/add`

  const handleCancel = () => router.push(`/forms/member/${memberId}`)

  return (
    <Modal 
      title={modalTitle}
      onCancel={handleCancel}
      modalPath={modalPath}
      showEditIcon
    >
      <AddCollectionItem
        memberId={memberId}
        collectionType={collectionType} 
        onCancel={handleCancel} 
      />
    </Modal>

  );
}

export default Page


