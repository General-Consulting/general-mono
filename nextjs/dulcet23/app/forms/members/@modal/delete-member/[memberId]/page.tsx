'use client'; 

import { useParams, useRouter } from 'next/navigation'

import DeleteMember from './DeleteMember';
import Modal from '@/components/Modal';

const Page = () => {
  const { memberId } = useParams<{ memberId: string }>()
  const router = useRouter()
  
  const handleCancel = () => router.push('/forms/members')

  const modalPath = `/forms/members/delete-member/${memberId}`

  return (
    <Modal 
      title="Delete Member"
      onCancel={handleCancel}
      modalPath={modalPath}
      showWarningIcon
    >
      <DeleteMember 
        memberId={memberId}
        onCancel={handleCancel} 
      />
    </Modal>
  );
}

export default Page


