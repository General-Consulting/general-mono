import {
  Compound,
  CompoundField,
  Field,
  FlexibleOptions,
  Income,
  OptionsField,
  SimpleField 
} from "@/types"
import { validateOptions } from "@/utils/validateOptions"


// Verify that a Radio/Checkbox/Select field has options prop with options that
// correspond to values allowed by the `Income` type
const validateIncomeOptions = <
  K extends keyof Income
>(
  key: K, 
  options: FlexibleOptions
) => validateOptions<Income, K, FlexibleOptions>(key, options);

// Type for the incomeFields constant
export type IncomeFieldsType = {
  [K in keyof Omit<Income, 'id'>]: K extends keyof typeof incomeFields
    ? typeof incomeFields[K]['field'] extends Field.Radio | Field.Checkbox | Field.Select
      ? OptionsField & { field: typeof incomeFields[K]['field'] }
      : typeof incomeFields[K]['field'] extends Compound
        ? CompoundField // TODO: refine what a CompoundField entails
        : SimpleField
    : never;
};

export const incomeFields: IncomeFieldsType = {
  incomeType: { 
    field: Field.Radio,
    options: validateIncomeOptions('incomeType', ["Employment", "Dumb"])
  },
  sourceName: { field: Field.TextInput },
  sourceAddress: { field: Compound.Address },
  amount: { field: Field.TextInput },
  frequency: {
    field: Field.Radio,
    options: validateIncomeOptions('frequency', ['Weekly', 'Every two weeks', 'Twice a month', 'Monthly', 'Quarterly', 'Yearly'])
  } 
}
