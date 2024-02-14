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
  const { editMember } = useHouseholdStore()
  
  // Add member to store
  const onSubmit = (data: any) => {
    editMember({ memberId, data })
    router.push('/forms/members')
  }

  // Close modal
  const handleCancel = () => onCancel()


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldFactory fieldData={allPossibleMemberFields} />
        <ModalDivider />
        <div className="sm:flex sm:justify-between">
          <DefaultButton
            onClick={handleCancel}
            className="w-full sm:w-24"
          >
            Cancel
          </DefaultButton>
          <HighlightButton
            // onClick={handleSave}
            type="submit"
            className="w-full sm:w-24"
          >
            Save
          </HighlightButton>
        </div>
      </form>
    </FormProvider>
  );
}

export default EditMember
