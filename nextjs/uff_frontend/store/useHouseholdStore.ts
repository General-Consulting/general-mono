import { create } from "zustand"

import { 
  HouseholdState,
  Member 
} from "../types"
import {
  findMemberIndex,
  addItem,
  updateItem,
  deleteItem
} from "./utils"


import { testMember1, testMember2 } from "./forDevOnly"






export const useHouseholdStore = create<HouseholdState>((set) => ({
  household: { members: [ testMember1, testMember2 ] }, // Initial state

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

  // Update member function
  updateMember: (updatedMemberData) => set((state) => {
    const updatedMemberId = updatedMemberData.id
    const index = findMemberIndex(state.household.members, updatedMemberId);
    if (index !== -1) {
      let updatedMembers = [...state.household.members];
      updatedMembers[index] = { ...updatedMembers[index], ...updatedMemberData };
      return { household: { ...state.household, members: updatedMembers } };
    }
    return state;
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

  modifyMemberCollection: ({ 
    memberId, 
    collectionType, 
    operation, 
    itemData, 
    itemId = ''
  }) => set((state) => {
    const memberIndex = findMemberIndex(state.household.members, memberId);
    if (memberIndex === -1) return state;

    let updatedMembers = [...state.household.members];
    let member = { ...updatedMembers[memberIndex] };
    let items = member[collectionType] || [];

    switch (operation) {
      case 'add':
        member[collectionType] = addItem(items, itemData);
        break;
      case 'update':
        member[collectionType] = updateItem(items, itemId, itemData);
        break;
      case 'delete':
        member[collectionType] = deleteItem(items, itemId);
        break;
      default:
        break;
    }

    updatedMembers[memberIndex] = member;
    return { household: { ...state.household, members: updatedMembers } };
  }),
}))