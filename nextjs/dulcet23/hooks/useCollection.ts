'use client'


// Define the shape of the item in the collection.
interface CollectionItem {
  id: string;
  // add other common properties
}

// Type for the parameters the hook will accept.
interface UseCollectionParams {
  memberId: string;
  collectionName: string;
}

// Type for the hook's return value.
interface UseCollectionReturn<T> {
  addItem: (item: T) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, item: Partial<T>) => void;
  items: T[];
  getItemById: (itemId: string) => T | undefined;
  getRequiredFields: () => string[];
  getDefaultValues: () => Partial<T>;
}

const useCollection = <T extends CollectionItem>({ 
  memberId, 
  collectionName 
}: UseCollectionParams): UseCollectionReturn<T> => {
  
}


// fn name () 