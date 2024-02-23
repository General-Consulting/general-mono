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
import { ValidCollectionName } from '@/types';
import useCollection from '@/hooks/useCollection';


interface AddCollectionProps {
  onCancel: () => void;
  memberId: string;
  collectionName: ValidCollectionName
}

// TODO - change fieldData

const AddCollection = ({
  onCancel,
  memberId,
  collectionName
}: AddCollectionProps) => {
  const { addItem } = useCollection({ collectionName, memberId })
  
  const router = useRouter()
  // TODO - getDefaultValues
  const methods = useForm()
  const { handleSubmit, register, setValue } = methods
  
  
  // Add item to a particular member's collection
  const onSubmit = (data: any) => {
    addItem(data)
    router.push(`/forms/member/${memberId}`)
  }

  // Close modal
  const handleCancel = () => onCancel()

  // Register `id` virutally & set value with uuid
  useEffect(() => {
    const newID = uuidv4()
    register('id', { required: true })
    setValue('id', newID)
  }, [register, setValue])


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

export default AddCollection
