"use client"

import { FC } from "react"

import Checkbox from "./Checkbox";
import Input from "./Input";
import Radio from "./Radio";
import { FieldData } from "@/types"


const componentMapping: { [key: string]: React.ElementType } = {
  Input: Input,
  Checkbox: Checkbox,
  Radio: Radio,
};

interface FieldFactoryProps {
  fieldsData: FieldData[]
  // component: 'Input' | 'Checkbox' | 'Radio',
  // label: string,
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FieldFactory: FC<FieldFactoryProps> = ({ 
  fieldsData 
}) => {
  // Map over fieldsData to create array of field components, e.g. Input, Radio, etc.
  const fields = fieldsData.map((fieldData, index) => {
    const { component, name, ...props } = fieldData;
    const FieldComponent = componentMapping[component];
    if (!FieldComponent) {
      throw new Error(`Unknown component type: ${component}`);
    }
    return (
    <FieldComponent 
      key={`${name}-${index}`}
      name={name} 
      {...props} 
      />
    );
  })

    // Render the array of elements
    return <>{fields}</>;
}

export default FieldFactory