'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid"


import DefaultButton from '@/components/DefaultButton';
import FieldFactory from '@/components/FieldFactory';
import HighlightButton from '@/components/HighlightButton';
import { ModalDivider } from '@/components/Modal'
import { allPossibleMemberFields } from '@/constants/allPossibleMembersFields'
import { useHouseholdStore } from '@/store/useHouseholdStore';


interface EditCollectionItemProps {
  onCancel: () => void;
  collectionType: 'income' | 'assets';
  itemId: string;
  memberId: string;
}

// TODO - change fieldData

const EditCollectionItem = ({
  onCancel,
  collectionType,
  itemId,
  memberId,
}: EditCollectionItemProps) => {
  const router = useRouter()
  // TODO - getDefaultValues
  const methods = useForm()
  const { handleSubmit, register, setValue } = methods
  const { editCollectionItem } = useHouseholdStore()
  
  // Add item to a particular member's collection
  const onSubmit = (data: any) => {
    editCollectionItem({ memberId, collectionType, itemId, data })
    router.push(`/forms/member/${memberId}`)
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

export default EditCollectionItem
