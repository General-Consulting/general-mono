'use client';

import { useRouter } from 'next/navigation';

import DefaultButton from '@/components/DefaultButton';
import HighlightButton from '@/components/HighlightButton';
import { ModalDivider } from '@/components/Modal'
import { useHouseholdStore } from '@/store/useHouseholdStore';


interface DeleteCollectionItemProps {
  onCancel: () => void;
  collectionType: 'income' | 'assets';
  itemId: string;
  memberId: string;
}

// TODO - change fieldData

const DeleteCollectionItem = ({
  onCancel,
  collectionType,
  itemId,
  memberId,
}: DeleteCollectionItemProps) => {
  const router = useRouter()
  const { deleteCollectionItem } = useHouseholdStore()
  
  // Delete item from a particular member's collection
  const handleDelete = () => {
    deleteCollectionItem({ memberId, collectionType, itemId })
    router.push(`/forms/member/${memberId}`)
  }

  // Close modal
  const handleCancel = () => onCancel()

  return (
    <>
      <p>Do you want to delete this item?</p>
      <p>This action cannot be undone.</p>
      <ModalDivider />
      <div className="sm:flex sm:justify-between">
        <DefaultButton
          onClick={handleCancel}
          className="w-full sm:w-24"
        >
          Cancel
        </DefaultButton>
        <HighlightButton
          onClick={handleDelete}
          type="button"
          className="w-full sm:w-24"
        >
          Delete
        </HighlightButton>
      </div>
    </>
  );
}

export default DeleteCollectionItem
