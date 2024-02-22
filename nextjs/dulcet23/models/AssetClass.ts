import CollectionBase from './CollectionBase';
import { assetFields } from '@/constants';

class AssetClass extends CollectionBase {
  collectionName = 'income';
  requiredFields = ['incomeType'];
  subsetFields = ['sourceName', 'incomeType', 'frequency'];
  fieldsMetadata = assetFields;
}

export default AssetClass