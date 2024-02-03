"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import Input from "@/components/Input";
import HiddenInput from "@/components/HiddenInput";

interface MemberFieldsProps {
  arrayName: string;
  index: number;
}

/* MemberFields component's responsibilities:
 * 1. Render Member fields.
 * 2. Set value for HiddenInput fields, based on watched values.
 *
 * IMPORTANT - This component controls values for HiddenInput fields.
 * HiddenInput fields do not track their own values.
 */

const MemberFields = ({ arrayName, index }: MemberFieldsProps) => {
  const { control, setValue } = useFormContext();

  // Field names for fields that need to be watched for value changes
  const memberID_Name = `${arrayName}.${index}.memberID`;
  const firstName_Name = `${arrayName}.${index}.firstName`;
  const middleName_Name = `${arrayName}.${index}.middleName`;
  const lastName_Name = `${arrayName}.${index}.lastName`;

  // Field names for fields that depend on watched values
  const middleInitial_Name = `${arrayName}.${index}.middleInitial`;

  // Call `useWatch` to watch the above fields' values
  const [memberID, firstName, middleName, lastName] = useWatch({
    control,
    name: [memberID_Name, firstName_Name, middleName_Name, lastName_Name],
  });

  // Perform calculations based on watched values to get values for HiddenInput fields
  // const middleInitial = (middleName.length > 0) ? middleName.charAt(0) + '.' : ''

  // Set values for HiddenInput fields
  // setValue(middleInitial_Name, middleInitial)

  // If no MemberID (i.e. array is new), set memberSet MemberID
  useEffect(() => {
    if (!memberID) {
      const newID = uuidv4();
      setValue(memberID_Name, newID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HiddenInput name={memberID_Name} />
      <Input name={firstName_Name} label="First name" type="text" />
      <Input name={middleName_Name} label="Middle name" type="text" />
      <Input name={lastName_Name} label="Last name" type="text" />
      <HiddenInput name={`${arrayName}.${index}.middleInitial`} />
    </>
  );
};

export default MemberFields;

// const firstName = useWatch({control, name: firstName_Name })
// const middleName = useWatch({control, name: middleName_Name })
// const lastName = useWatch({control, name: lastName_Name })
