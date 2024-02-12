'use client'; // TODO - should this be a server component?

import AddMember from './AddMember';
import Modal from '@/components/Modal';

const Page = () => {
  console.log('In the addMember page')
  return (
    <Modal title="Add Member">
      <AddMember />
    </Modal>

  );
}

export default Page


