import CollectionBase from './CollectionBase';
import { assetFields } from '@/constants';
import { Asset } from "@/types";

class AssetClass extends CollectionBase<Asset> {
  constructor() {
    super({
      collectionName: 'asset',
      baseRequiredFields: ['assetType'],
      subsetFields: ['assetName', 'assetType', 'value'],
      uiFields: assetFields
    })
  }
}

export default AssetClass