'use client'; 

import { usePathname, useRouter } from 'next/navigation'

import AddMember from './AddMember';
import Modal from '@/components/Modal';

const Page = () => {
  const router = useRouter()
  
  const handleCancel = () => router.push('/forms/members')

  return (
    <Modal 
      title="Add Member"
      onCancel={handleCancel}
      modalPath='/forms/members/add-member'
      showEditIcon
    >
      <AddMember onCancel={handleCancel} />
    </Modal>

  );
}

export default Page


