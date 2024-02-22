import CollectionBase from './CollectionBase';
import { incomeFields } from '@/constants';

class IncomeClass extends CollectionBase {
  collectionName = 'income';
  requiredFields = ['incomeType'];
  subsetFields = ['sourceName', 'incomeType', 'frequency'];
  fieldsMetadata = incomeFields;
}

export default IncomeClass