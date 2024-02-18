import { CollectionNameToTypeMap } from "./collection.types"
import { Member } from "./member.types";


// Specific type for editing a member 
export interface EditMemberParams {
  memberId: string,
  data: Member
}

// Base type for common parameters
export interface CollectionFunctionBaseParams<T extends keyof CollectionNameToTypeMap> {
  memberId: string;
  collectionName: T;
}

// Specific type for adding a collection item
export interface AddCollectionItemParams<T extends keyof CollectionNameToTypeMap> extends CollectionFunctionBaseParams<T> {
  data: CollectionNameToTypeMap[T];
}

// Specific type for editing a collection item, now using generics
export interface EditCollectionItemParams<T extends keyof CollectionNameToTypeMap> extends CollectionFunctionBaseParams<T> {
  itemId: string;
  data: CollectionNameToTypeMap[T];
}

// Specific type for deleting a collection item
export interface DeleteCollectionItemParams extends CollectionFunctionBaseParams<keyof CollectionNameToTypeMap> {
  itemId: string;
}


export interface Household {
  members: Member[];
  // Other flat data to be defined later
}

// Adjust HouseholdState interface to use these specific types
export interface HouseholdState {
  household: Household;
  addMember: (newMemberData: Member) => void;
  editMember: ({ memberId, data }: EditMemberParams) => void;
  deleteMember: (memberId: string) => void;
  addCollectionItem: <T extends keyof CollectionNameToTypeMap>(params: AddCollectionItemParams<T>) => void;
  editCollectionItem: <T extends keyof CollectionNameToTypeMap>(params: EditCollectionItemParams<T>) => void;
  deleteCollectionItem: (params: DeleteCollectionItemParams) => void;
}