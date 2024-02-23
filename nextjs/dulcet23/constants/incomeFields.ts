import {
  Compound,
  CompoundField,
  Field,
  OptionObject,
  Income,
  OptionsField,
  SimpleField 
} from "@/types"

// Check if options prop for Radio/Checkbox/Select matches `Income` field's values
function validateIncomeOptions<K extends keyof Income>(
  key: K, 
  options: Array<Income[K] | OptionObject<Income[K]>>
): Array<Income[K] | OptionObject<Income[K]>> {
  return options;
}

// Type for `incomeFields` constant
export type IncomeFieldsType = {
  [K in keyof Omit<Income, 'id'>]: K extends keyof typeof incomeFields
    ? typeof incomeFields[K]['field'] extends Field.Radio | Field.Checkbox | Field.Select
      ? OptionsField & { field: typeof incomeFields[K]['field'] }
      : typeof incomeFields[K]['field'] extends Compound
        ? CompoundField // TODO: refine what a CompoundField entails
        : SimpleField
    : never;
};

/* `incomeFields` constant
 * ========================
 * Contains details about all possible fields that might be rendered.
 * The details within this constant are then used by `FieldsFactory` 
 * component to determine how to actually render fields.
 * 
 * Whether or not any fields are rendered is determined by methods 
 * housed within `IncomeClass` and `useCollection`, which both make 
 * use of the application schemas of particular applications (e.g. PDFs)
 * to make that decision. 
 */ 
export const incomeFields: IncomeFieldsType = {
  incomeType: { 
    field: Field.Radio,
    options: validateIncomeOptions('incomeType', ["Employment", "Other"])
  },
  sourceName: { field: Field.TextInput },
  sourceAddress: { field: Compound.Address },
  amount: { field: Field.TextInput },
  frequency: {
    field: Field.Radio,
    options: validateIncomeOptions('frequency', ['Weekly', 'Every two weeks', 'Twice a month', 'Monthly', 'Quarterly', 'Yearly'])
  } 
}
