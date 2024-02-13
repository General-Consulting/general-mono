import { Member } from './entity.types'

export interface Household {
  id?: string;
  members: Member[];
  // Other flat data to be defined later
}


export interface HouseholdState {
  household: Household,
  addMember: (newMemberData: Member) => void;
  updateMember: (updatedMemberData: Member) => void;
  deleteMember: (memberId: string) => void;
  modifyMemberCollection: (params: { 
    memberId: string, 
    collectionType: Collection, 
    operation: Operation, 
    itemData?: Asset | Income, 
    itemId?: string,
  }) => void;
}