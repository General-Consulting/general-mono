import AssetClass from "@/models/AssetClass";
import IncomeClass from "@/models/IncomeClass";
import { 
  Asset,
  CollectionConstructor,
  CollectionClassMap,
  Income 
} from "@/types";

const collectionNameToClassMap: CollectionClassMap = {
  'income': IncomeClass as CollectionConstructor<Income>,
  'asset': AssetClass as CollectionConstructor<Asset>,
};

export default collectionNameToClassMap