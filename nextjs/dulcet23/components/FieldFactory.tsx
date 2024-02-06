import { ReactNode } from "react";

import { standardComponentStructures } from "@/constants/standardComponentStructures";
import { FieldSpec } from "@/types";
import { getComponentFromField } from "@/utils/getComponentFromField";

type FieldFactoryProps = (fieldData: FieldSpec) => ReactNode

const fieldFactory: FieldFactoryProps = (fieldData) => {
  return Object.entries(fieldData).map(([key, value]) => {
    // Check if the field is a compound field with a predefined structure
    if (value.field in standardComponentStructures) {
      // standardComponentStructures is for, e.g., Address. return {} as default to avoid type errors 
      const components = standardComponentStructures[value.field as keyof typeof standardComponentStructures] || {};
      // Use the predefined components for this compound field
      return (
        <fieldset key={key}>
          <legend>{value.label}</legend>
          {Object.entries(components).map(([componentKey, componentValue]) => {
            const [Component, props] = getComponentFromField(componentKey, componentValue);
            return <Component key={componentKey} name={`${key}.${componentKey}`} {...props} />;
          })}
        </fieldset>
      );
    } else {
      // Handle simple fields or custom compound fields
      const [Component, props] = getComponentFromField(key, value);
      return <Component key={key} name={key} {...props} />;
    }
  });
};