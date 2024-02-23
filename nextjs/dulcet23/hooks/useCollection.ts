'use client';

import { useHouseholdStore } from "@/store/useHouseholdStore";
import { CollectionNameToTypeMap } from "@/types";

// Adjusting the UseCollectionParams to directly use keyof CollectionNameToTypeMap for type safety
type UseCollectionParams<T> = {
  memberId: string;
  collectionName: T;
}

// Adjusting UseCollectionReturn to ensure type safety based on CollectionNameToTypeMap
interface UseCollectionReturn<T extends keyof CollectionNameToTypeMap> {
  addItem: (item: CollectionNameToTypeMap[T]) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, item: CollectionNameToTypeMap[T]) => void;
  items: CollectionNameToTypeMap[T][];
  getItemById: (itemId: string) => CollectionNameToTypeMap[T] | undefined;
  getRequiredFields: () => string[];
  getDefaultValues: () => Partial<CollectionNameToTypeMap[T]>;
}

const useCollection = <T extends keyof CollectionNameToTypeMap>({ 
  memberId, 
  collectionName 
}: UseCollectionParams<T>): UseCollectionReturn<T> => {
  const { 
    addCollectionItem,
    editCollectionItem,
    deleteCollectionItem,
    getCollectionItems,
    getCollectionItemById,
    // Assuming getCollectionSubset or a similar function is available for fetching items
  } = useHouseholdStore();

  // Add collection item to member in household store
  const addItem = (data: CollectionNameToTypeMap[T]) => {
    addCollectionItem<T>({ memberId, collectionName, data });
  };

  // Delete collection item from member in household store
  const deleteItem = (collectionItemId: string) => {
    deleteCollectionItem({ memberId, collectionName, collectionItemId });
  };

  // Edit collection item belonging to member in household store
  const editItem = (collectionItemId: string, data: CollectionNameToTypeMap[T]) => {
    editCollectionItem<T>({ memberId, collectionName, collectionItemId, data });
  };

  // Assuming items are fetched from the state, you need to implement or adjust this part based on your store setup
  const items = getCollectionItems({ memberId, collectionName }); // This should be replaced with actual logic to fetch items from the store
  
  // Get collection item by calling items
  const getItemById = (itemId: string) => getCollectionItemById({ memberId, collectionName, collectionItemId });

  // Placeholder for getRequiredFields and getDefaultValues. Implement based on actual requirements.
  const getRequiredFields = () => [];
  const getDefaultValues = () => ({});

  return { 
    addItem, 
    deleteItem, 
    editItem, 
    items, 
    getItemById, 
    getRequiredFields, 
    getDefaultValues 
  };
};

export default useCollection;
