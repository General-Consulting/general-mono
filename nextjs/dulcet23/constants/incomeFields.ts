import {
  Compound,
  CompoundField,
  Field,
  Income,
  OptionsField,
  SimpleField 
} from "@/types"

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
    options: ["Employment", "Wrong Value"]
  },
  sourceName: { field: Field.TextInput },
  sourceAddress: { field: Compound.Address },
  amount: { field: Field.TextInput },
  frequency: {
    field: Field.Radio,
    options: ['Weekly', 'Every two weeks', 'Twice a month', 'Monthly', 'Quarterly', 'Yearly']
  } 
}
