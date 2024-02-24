import CollectionBase from './CollectionBase';
import { incomeFields } from '@/constants';
import { Income } from "@/types";

class IncomeClass extends CollectionBase<Income> {
  constructor() {
    super({
      collectionName: 'income',
      baseRequiredFields: ['incomeType'],
      subsetFields: ['sourceName', 'incomeType', 'frequency'],
      uiFields: incomeFields
    })
  }
}

export default IncomeClass