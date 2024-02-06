import { 
  Field,
  FieldSpec,
  // RecordWithId - TODO - decide if this makes sense as a return type
} from "@/types"

// TODO - Should this type return RecordWithId
type GetDefaultValues = (fieldData: FieldSpec) => Record<string, unknown>

const getDefaultValues: GetDefaultValues = (fieldData) => {
  const defaultValues = {};
  for (const [key, value] of Object.entries(fieldData)) {
    if (value.field === Field.Person || value.field === Field.Address) {
      defaultValues[key] = {};
      Object.keys(value.components).forEach(componentKey => {
        defaultValues[key][componentKey] = ""; // Set default to empty string
      });
    } else {
      defaultValues[key] = ""; // Simple fields default to empty string
    }
  }
  return defaultValues;
}

export default getDefaultValues