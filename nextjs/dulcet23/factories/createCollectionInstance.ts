import collectionNameToClassMap from "@/mappings/collectionNameToClassMap"
import CollectionBase from "@/models/CollectionBase";
import { ValidCollectionName } from "@/types";

const createCollectionInstance = (collectionName: ValidCollectionName): CollectionBase => {
  const CollectionClass = collectionNameToClassMap[collectionName];
  if (!CollectionClass) {
    throw new Error(`Invalid collection name: ${collectionName}`);
  }
  return new CollectionClass();
}

export default createCollectionInstance