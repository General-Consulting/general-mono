import { useShallow } from "zustand/react/shallow";
import { useHouseholdStore } from "./useHouseholdStore";
import { Collection, IncomeSubset, AssetSubset } from "@/types";

// Mapping interface
interface CollectionTypeMap {
  income: IncomeSubset[];
  assets: AssetSubset[];
  // Add new mappings here as your application grows
}


// Updated Collection interface to be more generic
interface UseCollectionProps {
  memberId: string;
  collectionName: keyof CollectionTypeMap;
}

// Generic hook implementation
const useCollectionSubset = <T extends keyof CollectionTypeMap>({
  memberId,
  collectionName,
}: UseCollectionProps): CollectionTypeMap[T] => {
  const collectionSubset = useHouseholdStore(
    useShallow((state) => {
      const member = state.household.members.find((m) => m.id === memberId);
      if (!member) return [] as CollectionTypeMap[T];

      switch (collectionName) {
        case 'income':
          return (member.income?.map(({ id, sourceName }) => ({
            id,
            sourceName,
          })) || []) as CollectionTypeMap[T];
        case 'assets':
          return (member.assets?.map(({ id, assetType }) => ({
            id,
assetType,
          })) || []) as CollectionTypeMap[T];
        // Handle other cases as your application grows
        default:
          return [] as CollectionTypeMap[T];
      }
    })
  );

  return collectionSubset;
};

export default useCollectionSubset;
