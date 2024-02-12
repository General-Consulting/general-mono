'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';

import DefaultButton from '@/components/DefaultButton';
import HighlightButton from '@/components/HighlightButton';

{/* <FieldFactory fieldData={allPossibleMemberFields} /> */}


interface AddMemberProps {
  children: ReactNode
}

const AddMember = () => {

  console.log('In the addMember component')
  const router = useRouter();

  const handleCancel = () => router.back()
  const handleSave = () => console.log('Saved!')

  return (
    <>
  
      <DefaultButton onClick={handleCancel}>
        Cancel
      </DefaultButton>
      <HighlightButton onClick={handleSave}>
        Save
      </HighlightButton>
    </>
  );
}

export default AddMember
