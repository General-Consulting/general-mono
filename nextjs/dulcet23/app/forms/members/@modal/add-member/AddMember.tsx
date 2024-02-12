'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';

import DefaultButton from '@/components/DefaultButton';
import HighlightButton from '@/components/HighlightButton';

{/* <FieldFactory fieldData={allPossibleMemberFields} /> */}


interface AddMemberProps {
  onCancel: () => void;
}

const AddMember = ({
  onCancel
}: AddMemberProps) => {

  console.log('In the addMember component')
  const router = useRouter();

  const handleCancel = () => onCancel()
  const handleSave = () => console.log('Saved!')

  return (
    <>
  
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
    </>
  );
}

export default AddMember
