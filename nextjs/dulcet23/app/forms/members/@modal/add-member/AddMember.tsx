'use client';

import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from "react-hook-form"

import DefaultButton from '@/components/DefaultButton';
import FieldFactory from '@/components/FieldFactory';
import HighlightButton from '@/components/HighlightButton';
import { ModalDivider } from '@/components/Modal'
import { allPossibleMemberFields } from '@/constants/allPossibleMembersFields'
import { useHouseholdStore } from '@/store/useHouseholdStore';


interface AddMemberProps {
  onCancel: () => void;
}

const AddMember = ({
  onCancel
}: AddMemberProps) => {
  const router = useRouter()
  // TODO - getDefaultValues
  const methods = useForm()
  const { addMember } = useHouseholdStore()
  

  const onSubmit = (data: any) => {
    console.log('Inside onSubmit and data is', data)
    addMember(data)
    router.push('/forms/members')
  }

  const handleCancel = () => onCancel()


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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

export default AddMember
