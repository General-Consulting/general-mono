'use client';

import { useRouter } from 'next/navigation';
import { useForm, FormProvider, useFormContext } from "react-hook-form"

import DefaultButton from '@/components/DefaultButton';
import FieldFactory from '@/components/FieldFactory';
import HighlightButton from '@/components/HighlightButton';
import { ModalDivider } from '@/components/Modal'
import { allPossibleMemberFields } from '@/constants/allPossibleMembersFields'


interface AddMemberProps {
  onCancel: () => void;
}

const AddMember = ({
  onCancel
}: AddMemberProps) => {
  // TODO - getDefaultValues
  const methods = useForm()

  console.log('In the addMember component')


  const handleCancel = () => onCancel()
  const handleSave = () => console.log('Saved!')

  return (
    <FormProvider {...methods}>
      <form>
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
            onClick={handleSave}
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
