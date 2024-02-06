import { 
  Compound,
  Field,
  FieldSpec,
  // RecordWithId - TODO - decide if this makes sense as a return type
} from "@/types"

// TODO - Should this type return RecordWithId
type GetDefaultValues = (fieldData: FieldSpec) => Record<string, unknown>

const getDefaultValues: GetDefaultValues = (fieldData) => {
  // Define 'defaultValues' with an index signature
  const defaultValues: Record<string, any> = {}; // 'any' allows for both string and object values
  for (const [key, value] of Object.entries(fieldData)) {
    // TODO - Can I check that value.i
    if (value.field in Compound) {
      defaultValues[key] = {};
      // Object.keys(value.components).forEach(componentKey => {
      //   defaultValues[key][componentKey] = ""; // TypeScript understands 'defaultValues[key]' as an object here
      // });
    } else {
      defaultValues[key] = ""; // Simple fields default to an empty string
    }
  }
  return defaultValues;
}