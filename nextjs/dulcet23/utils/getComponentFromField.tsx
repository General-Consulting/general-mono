import React, { ComponentType } from 'react';


import Radio from '@/components/Radio';
import Checkbox from '@/components/Checkbox';
// import Select from '@/components/Select';
import Input from '@/components/Input'; // Generic input component
import { 
  Field,
  FieldVariant
} from '@/types'; // Import the Field enum
import { camelToFlat } from './camelToFlat';

// TODO - should this be in the general types index file?
interface FieldProps {
  label: string; 
  options?: string[]; 
  disabled?: () => void; 
  type?: string; 
  mask?: string; 
}

type ComponentWithProps = [React.ComponentType<any>, FieldProps];

type GetComponentFromFieldProps = (fieldKey: string, fieldObject: FieldVariant) => ComponentWithProps

// Returns a tuple with a React Component and the props to give to that component
export const getComponentFromField: GetComponentFromFieldProps = (fieldKey, fieldObject) => {
    const { field, label: specifiedLabel, ...rest } = fieldObject
  
    // If label not specified, create label from key -- e.g. homePhone -> Home Phone
    const label = specifiedLabel || camelToFlat(fieldKey)

    // Add new label to props so as to pass to component below
    const props = { label, ...rest }

    switch (field) {
      case Field.Radio:
        return [Radio, props];
      case Field.Checkbox:
        return [Checkbox, props];
      case Field.TextInput:
        return [Input, { type: "text", ...props }];
      case Field.PhoneInput:
        return [Input, { type: "text", ...props }];
        // case Field.SSN: TODO - need to add details here
        // return [Input, {type: "text", mask: "ssn", {...props}];
      default:
        // TODO - should this e a generic Input or exhaustive
        return [Input, props];
    }
}
