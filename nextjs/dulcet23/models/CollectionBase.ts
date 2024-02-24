import { compoundStructures } from "@/constants/compoundStructures";
import { 
  Collection,
  CollectionConstant,
  CollectionNameToTypeMap,
  CompoundField,
  Field,
  OptionsField,
  SimpleField,
  ReverseMapping 
} from "@/types"
import { isCompoundField } from "@/utils";

type GetExistingDefaultValuesResults<C> = {
  existingDefaultValues: Partial<C>,
  fieldsWithoutExistingValue: string[]
}


abstract class CollectionBase<C extends Collection> {
  collectionName: ReverseMapping<C, CollectionNameToTypeMap>;
  baseRequiredFields: (keyof C)[];
  subsetFields: (keyof C)[];
  uiFields: CollectionConstant<C>;

  constructor({
    collectionName,
    baseRequiredFields, 
    subsetFields,
    uiFields
  }: {
    collectionName: ReverseMapping<C, CollectionNameToTypeMap>
    baseRequiredFields: (keyof C)[],
    subsetFields: (keyof C)[],
    uiFields: CollectionConstant<C>
  }) {
    this.collectionName = collectionName
    this.baseRequiredFields = baseRequiredFields
    this.subsetFields = subsetFields
    this.uiFields = uiFields
  }

  getFilteredUIFields(allNeededFields: string[]): Partial<CollectionConstant<C>> {
    const filteredFields: Partial<CollectionConstant<C>> = {};

    Object.keys(this.uiFields).forEach((key) => {
      const uiField = this.uiFields[key as keyof CollectionConstant<C>];

      if ('field' in uiField && isCompoundField(uiField.field)) {
        // It's a compound field, iterate over its subfields
        const compoundKey = uiField.field; // The Compound enum value
        const subFields = compoundStructures[compoundKey];
        let includeCompound = false;

        Object.keys(subFields).forEach((subFieldKey) => {
          const compoundPropertyString = `${compoundKey}.${subFieldKey}`;
          if (allNeededFields.includes(compoundPropertyString)) {
            includeCompound = true;
          }
        });

        if (includeCompound) {
          filteredFields[key as keyof CollectionConstant<C>] = uiField;
        }
      } else if (allNeededFields.includes(key)) {
        // Direct match, include it in the result
        filteredFields[key as keyof CollectionConstant<C>] = uiField;
      }
    });

    return filteredFields;
  }

  getExistingDefaultValues(
    allNeededFields: string[], 
    collectionItem: C
  ): GetExistingDefaultValuesResults<C> {
    const existingDefaultValues: Partial<C> = {} as Partial<C>;
    const fieldsWithoutExistingValue: string[] = [];
  
    allNeededFields.forEach(fieldPath => {
      const pathParts = fieldPath.split('.');
      let matched = true;
  
      if (pathParts.length === 1) {
        // Handle top-level fields
        const fieldName = pathParts[0] as keyof C;
        if (fieldName in collectionItem) {
          existingDefaultValues[fieldName] = collectionItem[fieldName];
        } else {
          matched = false;
        }
      } else if (pathParts.length === 2) {
        // Handle one-level-deep nested fields
        const [parentField, childField] = pathParts;
        const parentFieldName = parentField as keyof C;
        const childFieldName = childField as keyof any; // Loosen typing for child fields

        // Ensure the parent field exists and is an object before attempting to assign child fields
        if (parentFieldName in collectionItem && typeof collectionItem[parentFieldName] === 'object' && collectionItem[parentFieldName] !== null) {
          const nestedObject = (collectionItem[parentFieldName] as any)[childFieldName];
          if (nestedObject) {
            existingDefaultValues[parentFieldName] = existingDefaultValues[parentFieldName] || {} as any;
            (existingDefaultValues[parentFieldName] as any)[childFieldName] = nestedObject;
            matched = true;
          }
        }
      }
  
      if (!matched) {
        fieldsWithoutExistingValue.push(fieldPath);
      }
    });
  
    return { existingDefaultValues, fieldsWithoutExistingValue };
  }

  getBlankDefaultValues(
    allNeededFields: string[],
    filteredUIFields: Partial<CollectionConstant<C>>
  ): Partial<C> {
    const blankDefaultValues: Partial<C> = {} as Partial<C>;

    allNeededFields.forEach(fieldPath => {
      const pathParts = fieldPath.split('.');
      if (pathParts.length === 1) {
        // Handle top-level fields
        const fieldName = pathParts[0] as keyof CollectionConstant<C>;
        if (fieldName in filteredUIFields) {
          const fieldType = filteredUIFields[fieldName]?.field;
          blankDefaultValues[fieldName] = (fieldType === Field.Checkbox ? [] : "") as any;
        }
      } else if (pathParts.length === 2) {
        // Handle one-level-deep nested fields
        const [parentField, childField] = pathParts;
        const parentFieldName = parentField as keyof typeof filteredUIFields;
        if (parentFieldName in filteredUIFields) {
          const compoundField = filteredUIFields[parentFieldName] as CompoundField;
          // Ensure we're dealing with a compound field with components
          // if (compoundField && 'components' in compoundField) {
          const childComponent = compoundField?.components?.[childField] as SimpleField | OptionsField;
          if (childComponent) {
            const childFieldType = childComponent.field;
            blankDefaultValues[parentFieldName] = blankDefaultValues[parentFieldName] || {} as any;
            (blankDefaultValues[parentFieldName] as any)[childField] = childFieldType === Field.Checkbox ? [] : "";
          }
        }
      }
    })

    return blankDefaultValues;
  }

  getDefaultValues(): Partial<Record<string, any>> {
    const defaults: Partial<Record<string, any>> = {};
    // Object.keys(this.fieldsMetadata).forEach(field => {
    //   defaults[field] = this.fieldsMetadata[field].defaultValue || null;
    // });
    return defaults;
  }

}

export default CollectionBase