'use client'; 

import { usePathname, useParams, useRouter } from 'next/navigation'

import AddCollection from './AddCollection';
import Modal from '@/components/Modal';
import CollectionLinkGenerator from '@/utils/CollectionLinkGenerator';

const Page = () => {
  const router = useRouter()
  const { 
    memberId, 
    collectionType,
  } = useParams<{ memberId: string, collectionType: 'income' | 'assets' }>()
  
  const modalPath = `/forms/member/${memberId}/${collectionType}/add`

  const handleCancel = () => router.push(`/forms/member/${memberId}`)

  return (
    <Modal 
      title="Add Member"
      onCancel={handleCancel}
      modalPath={modalPath}
      showEditIcon
    >
      <AddCollection
        memberId={memberId}
        collectionType={collectionType} 
        onCancel={handleCancel} 
      />
    </Modal>

  );
}

export default Page


