"use client"

import { FC } from "react"

import Checkbox from "./Checkbox";
import Input from "./Input";
import Radio from "./Radio";

const componentMapping: { [key: string]: React.ElementType } = {
  Input: Input,
  Checkbox: Checkbox,
  Radio: Radio,
};

interface FieldFactoryProps {
  component: 'Input' | 'Checkbox' | 'Radio',
  label: string,
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FieldFactory: FC<FieldFactoryProps> = ({ 
  component, 
  ...props 
}) => {
  const FieldComponent = componentMapping[component];
  if (!FieldComponent) {
    throw new Error(`Unknown component type: ${component}`);
  }
  return <FieldComponent {...props} />;
}

export default FieldFactory