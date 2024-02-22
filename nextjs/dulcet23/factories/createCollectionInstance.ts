import AssetClass from "@/models/AssetClass";
import CollectionBase from "@/models/CollectionBase";
import IncomeClass from "@/models/IncomeClass";
import { ValidCollectionName } from "@/types";

const collectionNameToClassMap: Record<ValidCollectionName, new () => CollectionBase> = {
  'income': IncomeClass,
  'asset': AssetClass,
};

const createCollectionInstance = (collectionName: ValidCollectionName): CollectionBase => {
  const CollectionClass = collectionNameToClassMap[collectionName];
  if (!CollectionClass) {
    throw new Error(`Invalid collection name: ${collectionName}`);
  }
  return new CollectionClass();
}

export default createCollectionInstance