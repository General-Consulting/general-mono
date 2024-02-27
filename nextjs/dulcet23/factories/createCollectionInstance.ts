import collectionNameToClassMap from "@/mappings/collectionNameToClassMap"
import CollectionBase from "@/models/CollectionBase";
import {
  CollectionNameToTypeMap, 
  ValidCollectionName 
} from "@/types";

function createCollectionClassInstance<K extends ValidCollectionName>(
  collectionName: K
): CollectionBase<CollectionNameToTypeMap[K]> {
  const CollectionClass = collectionNameToClassMap[collectionName];
  if (!CollectionClass) {
    throw new Error(`Invalid collection name: ${collectionName}`);
  }
  return new CollectionClass() as CollectionBase<CollectionNameToTypeMap[K]>;
}

export default createCollectionClassInstance