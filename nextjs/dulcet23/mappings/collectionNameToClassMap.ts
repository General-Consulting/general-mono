import AssetClass from "@/models/AssetClass";
import CollectionBase from "@/models/CollectionBase";
import IncomeClass from "@/models/IncomeClass";
import { ValidCollectionName } from "@/types";

const collectionNameToClassMap: Record<ValidCollectionName, new () => CollectionBase> = {
  'income': IncomeClass,
  'asset': AssetClass,
};

export default collectionNameToClassMap