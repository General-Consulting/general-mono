import {
  Compound,
  CompoundField,
  Field,
  OptionObject,
  Asset,
  OptionsField,
  SimpleField 
} from "@/types"

// Check if options prop for Radio/Checkbox/Select matches `Income` field's values
function validateAssetOptions<K extends keyof Asset>(
  key: K, 
  options: Array<Asset[K] | OptionObject<Asset[K]>>
): Array<Asset[K] | OptionObject<Asset[K]>> {
  return options;
}

// Type for `incomeFields` constant
export type AssetFieldsType = {
  [K in keyof Omit<Asset, 'id'>]: K extends keyof typeof assetFields
    ? typeof assetFields[K]['field'] extends Field.Radio | Field.Checkbox | Field.Select
      ? OptionsField & { field: typeof assetFields[K]['field'] }
      : typeof assetFields[K]['field'] extends Compound
        ? CompoundField // TODO: refine what a CompoundField entails
        : SimpleField
    : never;
};

// export type AssetFieldsType = {
//   [K in keyof Omit<Asset, 'id'>]: 
//     Field.Radio | Field.Checkbox | Field.Select extends Asset[K]
//       ? OptionsField
//       : Compound extends Asset[K]
//         ? CompoundField
//         : SimpleField;
// };

/* `assetFields` constant
 * ========================
 * Contains details about all possible fields that might be rendered.
 * The details within this constant are then used by `FieldsFactory` 
 * component to determine how to actually render fields.
 * 
 * Whether or not any fields are rendered is determined by methods 
 * housed within `AssetClass` and `useCollection`, which both make 
 * use of the application schemas of particular applications (e.g. PDFs)
 * to make that decision. 
 */ 
export const assetFields: AssetFieldsType = {
  assetName: { field: Field.TextInput },
  assetType: { field: Field.TextInput },
  value: { field: Field.TextInput },
}

