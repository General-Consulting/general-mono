import {
  CollectionConstant,
  Compound,
  Field,
  Income,
} from "@/types"
import { createValidateOptionsForCollection } from "@/utils/createValidationOptionsForCollection";


const validateIncomeOptions = createValidateOptionsForCollection<Income>()

export type IncomeFieldsType = CollectionConstant<Income>

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
    options: validateIncomeOptions('frequency', [
      'Weekly', 
      'Every two weeks', 
      'Twice a month', 
      'Monthly', 
      'Quarterly', 
      'Yearly'
    ])
  },
}
