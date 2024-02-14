import { create } from "zustand"

import { 
  HouseholdState,
  Member 
} from "../types"
import {
  findMemberIndex,
  addItem,
  deleteItem,
  editItem,
  prepareMemberCollectionForUpdate
} from "./utils"


import { testMember1, testMember2 } from "./forDevOnly"



export const useHouseholdStore = create<HouseholdState>((set, get) => ({
  household: { members: [ testMember1, testMember2 ] }, // Initial state

  // Use the get method to get a member's first and last name by ID
  getMemberById: (memberId: string) => {
    const member = get().household.members.find(member => member.id === memberId);
    if (member) {
      // Assuming your Member type has a nested structure for names like { name: { first: '', last: '' } }
      // Adjust according to your actual data structure
      return { firstName: member.name.first, lastName: member.name.last };
    } else {
      // Member not found, return null or an appropriate response
      return null;
    }
  },

  // Add member function
  addMember: (newMemberData: Member) => set((state) => {
    const newMemberId = newMemberData.id
    const index = findMemberIndex(state.household.members, newMemberId);

    if (index !== -1) {
      // Update existing member
      let updatedMembers = [...state.household.members];
      updatedMembers[index] = { ...updatedMembers[index], ...newMemberData };
      return { household: { ...state.household, members: updatedMembers } };
    } else {
      // Add new member
      return {
        household: { ...state.household, members: [...state.household.members, newMemberData] },
      };
    }
  }),

  editMember: ({ memberId, data }) => set((state) => {
    const index = state.household.members.findIndex(member => member.id === memberId);
    if (index !== -1) {
      // Create a new array of members to maintain immutability
      let updatedMembers = [...state.household.members];
      // Update only the specified fields for the member
      updatedMembers[index] = { ...updatedMembers[index], ...data };
      // Return the new state with the updated members array
      return { household: { ...state.household, members: updatedMembers } };
    }
    return state; // In case the memberId does not match any member, return the current state
  }),

  // Delete member function
  deleteMember: (memberId) => set((state) => {
    return {
      household: {
        ...state.household,
        members: state.household.members.filter(member => member.id !== memberId),
      }
    };
  }),

  // Add item to a member collection, e.g. income
  addCollectionItem: ({ memberId, collectionType, data }) => set((state) => {
    const prep = prepareMemberCollectionForUpdate(state.household.members, memberId, collectionType);
    if (!prep) return state; // Member not found

    prep.member[collectionType] = addItem(prep.items, data);
    prep.updatedMembers[prep.memberIndex] = prep.member;

    return { household: { ...state.household, members: prep.updatedMembers } };
  }),

  // Edit item in a member collection, e.g. income
  editCollectionItem: ({ memberId, collectionType, itemId, data }) => set((state) => {
    const prep = prepareMemberCollectionForUpdate(state.household.members, memberId, collectionType);
    if (!prep) return state; // Member not found

    prep.member[collectionType] = editItem(prep.items, itemId, data);
    prep.updatedMembers[prep.memberIndex] = prep.member;

    return { household: { ...state.household, members: prep.updatedMembers } };
  }),

  // Delete item in a member collection, e.g. income
  deleteCollectionItem: ({ memberId, collectionType, itemId }) => set((state) => {
    const prep = prepareMemberCollectionForUpdate(state.household.members, memberId, collectionType);
    if (!prep) return state; // Member not found

    prep.member[collectionType] = deleteItem(prep.items, itemId);
    prep.updatedMembers[prep.memberIndex] = prep.member;

    return { household: { ...state.household, members: prep.updatedMembers } };
  }),
}))