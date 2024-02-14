'use client';

import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid"


import DefaultButton from '@/components/DefaultButton';
import FieldFactory from '@/components/FieldFactory';
import HighlightButton from '@/components/HighlightButton';
import { ModalDivider } from '@/components/Modal'
import { allPossibleMemberFields } from '@/constants/allPossibleMembersFields'
import { useHouseholdStore } from '@/store/useHouseholdStore';


interface EditMemberProps {
  memberId: string;
  onCancel: () => void;
}

const EditMember = ({
  memberId,
  onCancel
}: EditMemberProps) => {
  const router = useRouter()
  // TODO - getDefaultValues
  const methods = useForm()
  const { handleSubmit } = methods
  const { deleteMember } = useHouseholdStore()
  
  // Delete member and ALL RELATED COLLECTIONS
  const handleDelete = () => {
    deleteMember(memberId)
    router.push('/forms/members')
  }

  // Close modal
  const handleCancel = () => onCancel()


  return (
    <>
      <p>Do you want to delete this member?</p>
      <p>This will also delete any items added on the member&apos;s page, such as income or assets.</p>
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

export default EditMember
