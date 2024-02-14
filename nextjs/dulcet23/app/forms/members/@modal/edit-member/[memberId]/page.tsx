'use client'; 

import { useParams, useRouter } from 'next/navigation'

import EditMember from './EditMember';
import Modal from '@/components/Modal';

const Page = () => {
  const { memberId } = useParams<{ memberId: string }>()
  const router = useRouter()
  
  const handleCancel = () => router.push('/forms/members')

  const modalPath = `/forms/members/edit-member/${memberId}`

  return (
    <Modal 
      title="Edit Member"
      onCancel={handleCancel}
      modalPath={modalPath}
      showEditIcon
    >
      <EditMember 
        memberId={memberId}
        onCancel={handleCancel} 
      />
    </Modal>

  );
}

export default Page


