import { Asset, Income, Member } from './entity.types'

export interface Household {
  id?: string;
  members: Member[];
  // Other flat data to be defined later
}


// Base type for common parameters
interface CollectionFunctionBaseArgs {
  memberId: string;
  collectionType: 'income' | 'assets';
}

// Specific type for adding a collection item (does not require itemId)
interface AddCollectionItemArgs extends CollectionFunctionBaseArgs {
  data: Asset | Income;
}

// Specific type for editing a collection item (requires all parameters)
interface EditCollectionItemArgs extends CollectionFunctionBaseArgs {
  itemId: string;
  data: Asset | Income;
}

// Specific type for deleting a collection item (does not require data)
interface DeleteCollectionItemArgs extends CollectionFunctionBaseArgs {
  itemId: string;
}

// Adjust HouseholdState interface to use these specific types
export interface HouseholdState {
  household: Household;
  addMember: (newMemberData: Member) => void;
  updateMember: (updatedMemberData: Member) => void;
  deleteMember: (memberId: string) => void;
  addCollectionItem: (params: AddCollectionItemArgs) => void;
  editCollectionItem: (params: EditCollectionItemArgs) => void;
  deleteCollectionItem: (params: DeleteCollectionItemArgs) => void;
}