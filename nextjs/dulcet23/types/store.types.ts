import { Asset, Income, Member } from './entity.types'

export interface Household {
  id?: string;
  members: Member[];
  // Other flat data to be defined later
}

// Args when calling editMember method
export interface EditMemberArgs {
  memberId: string,
  data: Member
}

// Base type for common parameters
export interface CollectionFunctionBaseArgs {
  memberId: string;
  collectionType: 'income' | 'assets';
}

// Specific type for adding a collection item (does not require itemId)
export interface AddCollectionItemArgs extends CollectionFunctionBaseArgs {
  data: Asset | Income;
}

// Specific type for editing a collection item (requires all parameters)
export interface EditCollectionItemArgs extends CollectionFunctionBaseArgs {
  itemId: string;
  data: Asset | Income;
}

// Specific type for deleting a collection item (does not require data)
export interface DeleteCollectionItemArgs extends CollectionFunctionBaseArgs {
  itemId: string;
}



// Adjust HouseholdState interface to use these specific types
export interface HouseholdState {
  household: Household;
  addMember: (newMemberData: Member) => void;
  editMember: ({ memberId, data }: EditMemberArgs) => void;
  deleteMember: (memberId: string) => void;
  addCollectionItem: (params: AddCollectionItemArgs) => void;
  editCollectionItem: (params: EditCollectionItemArgs) => void;
  deleteCollectionItem: (params: DeleteCollectionItemArgs) => void;
}