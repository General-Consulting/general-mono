'use client';

import { useEffect, useRef, useState } from "react";

import createCollectionClassInstance from "@/factories/createCollectionInstance";
import { useHouseholdStore } from "@/store/useHouseholdStore";
import { 
  CollectionConstant,
  CollectionNameToTypeMap,
  ValidCollectionName
} from "@/types";
import CollectionBase from "@/models/CollectionBase";

// Adjusting the UseCollectionParams to directly use keyof CollectionNameToTypeMap for type safety
type UseCollectionParams<T> = {
  memberId: string;
  collectionName: T;
  collectionItemId?: string;
}

// Adjusting UseCollectionReturn to ensure type safety based on CollectionNameToTypeMap
interface UseCollectionReturn<T extends ValidCollectionName> {
  addItem: (item: CollectionNameToTypeMap[T]) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, item: CollectionNameToTypeMap[T]) => void;
  items: CollectionNameToTypeMap[T][];
  getItemById: (itemId: string) => CollectionNameToTypeMap[T] | undefined;
  defaultValuesForAdd: Partial<CollectionNameToTypeMap[T]>;
  uiFieldsForAdd: Partial<CollectionConstant<CollectionNameToTypeMap[T]>>;
  defaultValuesForEdit: Partial<CollectionNameToTypeMap[T]>;
  uiFieldsForEdit: Partial<CollectionConstant<CollectionNameToTypeMap[T]>>
}

const allNeededFieldsForTesting = [
  'sourceName',
  'sourceAddress.state',
  'sourceAddress.zipCode',
  'frequency'
]

const useCollection = <T extends ValidCollectionName>({ 
  memberId, 
  collectionName,
  collectionItemId 
}: UseCollectionParams<T>): UseCollectionReturn<T> => {
  // Hold reference to Collection class
  const collectionRef = useRef<CollectionBase<CollectionNameToTypeMap[T]>>();
  
  // Hold values needed for form that adds item to collection
  const [ defaultValuesForAdd, setDefaultValuesForAdd ] = useState({})
  const [ uiFieldsForAdd, setUIFieldsForAdd ] = useState({})

  // Hold values needed for form that edits existing item in collection
  const [ defaultValuesForEdit, setDefaultValuesForEdit ] = useState({})
  const [ uiFieldsForEdit, setUIFieldsForEdit ] = useState({})



  const { 
    addCollectionItem,
    editCollectionItem,
    deleteCollectionItem,
    getCollectionItems,
    getCollectionItemById,
    // Assuming getCollectionSubset or a similar function is available for fetching items
  } = useHouseholdStore();

  /* Instantiate Collection class
   * ============================
   * The Collection class hard codes details about each type of
   * of collection (e.g. fields required by the app logic, 
   * where the constant with UI fields data is stored, etc.),
   * and provides methods primarily for filtering UI fields and
   * and preparing default values.
   * 
   * The class instance is instantiated inside a useEffect and 
   * passed to a ref. 
   */ 
  useEffect(() => {
    if (!collectionRef.current) {
      const Collection = createCollectionClassInstance(collectionName)
      collectionRef.current = Collection
    }
  }, [collectionName])
  

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
  const getItemById = (itemId: string) => getCollectionItemById({ memberId, collectionName, collectionItemId: itemId });


  /* Prepare to add item
   * ===================
   * The form for adding an item to a collection requires blank default 
   * values based on the list of filtered UI fields -- [] for checkboxes and
   * "" for all other fields -- as well as the UI field details. This 
   * useEffect updates those state values -- defaultValuesForAdd & 
   * uiFieldsForAdd -- and re-runs whenever any of the hook's props change. 
   */ 
  useEffect(() => {
    const prepareForEditing = () => {
      // Get class
      const Collection = collectionRef.current;

      if (!Collection) return [{}, {}]
  
      const filteredUIFields = Collection.prepareUIFields(allNeededFieldsForTesting)
  
      if (!collectionItemId) return [{}, {}];
    
      // For any values not in store, generate blank default values, i.e. "" or []
      const blankDefaultValues = Collection.getBlankDefaultValues(
        allNeededFieldsForTesting,
        filteredUIFields
      )
    
      return [ blankDefaultValues, filteredUIFields ]
  
    }

    const [ defaultValues, filteredUIFields ] = prepareForEditing()

    setDefaultValuesForAdd(defaultValues);
    setUIFieldsForAdd(filteredUIFields)
    
  }, [ memberId, collectionName, collectionItemId ])


  /* Prepare to edit item
   * ====================
   * The form for editing existing collection item requires default values
   * based on the values inside the store, as well as a list of filtered
   * UI fields with details on how to render the fields. This useEffect 
   * updates those state values -- defaultValuesForEdit & uiFieldsForEdit --
   * and re-runs whenever any of the hook's props change. 
   */ 
  useEffect(() => {
    const prepareForEditing = () => {
      // Get class
      const Collection = collectionRef.current;

      if (!Collection) return [{}, {}]
  
      const filteredUIFields = Collection.prepareUIFields(allNeededFieldsForTesting)
  
      if (!collectionItemId) return [{}, {}];

      // Get existing item (w/ existing values) from store
      const collectionItem = getCollectionItemById({ 
        memberId, 
        collectionName, 
        collectionItemId 
      })
  
      if (!collectionItem) return [{}, {}];
  
      // Parse values from store and needed fields
      const { 
        existingDefaultValues, 
        fieldsWithoutExistingValue
      } = Collection.getExistingDefaultValuesAndMissingFields(
        allNeededFieldsForTesting, 
        collectionItem
      )
  
      // For any values not in store, generate blank default values, i.e. "" or []
      const blankDefaultValues = Collection.getBlankDefaultValues(
        fieldsWithoutExistingValue,
        filteredUIFields
      )
  
      // Combine default values, handling nested values as needed
      const defaultValues = Collection.combineDefaultValues(
        existingDefaultValues,
        blankDefaultValues
      )
  
      return [ defaultValues, filteredUIFields ]
  
    }

    const [ defaultValues, filteredUIFields ] = prepareForEditing()

    setDefaultValuesForEdit(defaultValues);
    setUIFieldsForEdit(filteredUIFields)
    
  }, [
    memberId, 
    collectionName, 
    collectionItemId, 
    // TODO - collectionRef not included -- that's okay, right?
    // TODO - should I put functions in the dependency array?
  ])

  return { 
    addItem, 
    deleteItem, 
    editItem, 
    items, 
    getItemById,
    defaultValuesForAdd,
    uiFieldsForAdd, 
    defaultValuesForEdit,
    uiFieldsForEdit, 
  };
};

export default useCollection;
