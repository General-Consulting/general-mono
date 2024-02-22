import collectionNameToClassMap from "@/mappings/collectionNameToClassMap";
import { ValidCollectionName } from "@/types";

const isValidCollectionName = (name: string): name is ValidCollectionName => {
  return Object.keys(collectionNameToClassMap).includes(name);
};

export default isValidCollectionName