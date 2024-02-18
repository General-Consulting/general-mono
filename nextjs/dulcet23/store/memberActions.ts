
import { StoreApi } from 'zustand';

import { HouseholdState, Member } from '@/types';
import { findMemberIndex } from "./utils";

const memberActions = (
  set: StoreApi<HouseholdState>['setState'],
  get: StoreApi<HouseholdState>['getState'],
  api: StoreApi<HouseholdState>
) => ({  
  addMember: (newMemberData: Member) => {
    set((state) => {
      const newMemberId = newMemberData.id;
      const index = findMemberIndex(state.household.members, newMemberId);

      if (index !== -1) {
        let updatedMembers = [...state.household.members];
        updatedMembers[index] = { ...updatedMembers[index], ...newMemberData };
        return { household: { ...state.household, members: updatedMembers } };
      } else {
        return { household: { ...state.household, members: [...state.household.members, newMemberData] } };
      }
    });
  },

  editMember: ({ memberId, data }: { memberId: string, data: Member }) => {
    set((state) => {
      const index = state.household.members.findIndex(member => member.id === memberId);
      if (index !== -1) {
        let updatedMembers = [...state.household.members];
        updatedMembers[index] = { ...updatedMembers[index], ...data };
        return { household: { ...state.household, members: updatedMembers } };
      }
      return state;
    });
  },

  deleteMember: (memberId: string) => {
    set((state) => ({
      household: { ...state.household, members: state.household.members.filter(member => member.id !== memberId) },
    }));
  },
});

export default memberActions;
