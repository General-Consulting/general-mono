import { FieldData } from '@/types'

/* generateDefaultValues function definition
 * Accepts fieldsData, which should likely be pulled from DB
 * Returns object where each field name is associated with an '' or []
 * For use in making `defaultValues` required by react-hook-form's useForm()
 */
const getDefaultValues = (fieldsData: FieldData[]): { [key: string]: string | string[] } => {
  return fieldsData.reduce((acc, field) => {
    // Assign an empty string or an empty array as the default value based on the component type
    acc[field.name] = field.component === 'Checkbox' ? [] : '';
    return acc;
  }, {} as { [key: string]: string | any[] });
};

export default getDefaultValues