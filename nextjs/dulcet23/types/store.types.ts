import { CollectionNameToTypeMap } from "./collection.types"
import { Member } from "./member.types";
import { ToArrayTypes } from "./common.types"


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
export interface AddCollectionItemParams<T extends keyof CollectionNameToTypeMap> {
  memberId: string;
  collectionName: T;
  data: CollectionNameToTypeMap[T];
}
// Specific type for editing a collection item, now using generics
export type EditCollectionItemParams<T extends keyof CollectionNameToTypeMap> = {
  memberId: string;
  collectionName: T;
  collectionItemId: string;
  data: CollectionNameToTypeMap[T]; // Assuming this data structure for simplification
};

// Specific type for deleting a collection item
export interface DeleteCollectionItemParams<T extends keyof CollectionNameToTypeMap> {
  memberId: string;
  collectionName: T;
  collectionItemId: string;
}

// // Specific type for getting a collection subset of fields, used for UI tables 
// export type GetCollectionSubsetParams<T extends keyof ToArrayTypes<CollectionNameToTypeMap>> = {
//   memberId: string;
//   collectionName: T;
// };

export type GetCollectionItemsParams<T extends keyof ToArrayTypes<CollectionNameToTypeMap>> = {
  memberId: string;
  collectionName: T;
};

export type GetCollectionItemByIdParams<T extends keyof CollectionNameToTypeMap> = {
  memberId: string;
  collectionName: T;
  collectionItemId: string;
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
  deleteCollectionItem: <T extends keyof CollectionNameToTypeMap>(params: DeleteCollectionItemParams<T>) => void;
  // getCollectionSubset: <T extends keyof ToArrayTypes<CollectionNameToTypeMap>>(
  //   params: GetCollectionSubsetParams<T>
  // ) => ToArrayTypes<CollectionNameToTypeMap>[T];
  getCollectionItems: <T extends keyof ToArrayTypes<CollectionNameToTypeMap>>(
    params: GetCollectionItemsParams<T>
  ) => ToArrayTypes<CollectionNameToTypeMap>[T];
  getCollectionItemById: <T extends keyof CollectionNameToTypeMap>(
    params: GetCollectionItemByIdParams<T>
  ) => CollectionNameToTypeMap[T] | undefined
}