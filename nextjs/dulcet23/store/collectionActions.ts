// collectionActions.ts
import { StateCreator } from 'zustand'
import { HouseholdState, AddCollectionItemArgs, EditCollectionItemArgs, DeleteCollectionItemArgs } from './types'
import { prepareMemberCollectionForUpdate, addItem, editItem, deleteItem } from "./utils";

export const collectionActions: StateCreator<HouseholdState> = (set, get) => ({
  addCollectionItem: ({ memberId, collectionType, data }: AddCollectionItemArgs) => {
    const prep = prepareMemberCollectionForUpdate(get().household.members, memberId, collectionType);
    if (!prep) return; // Member not found

    prep.member[collectionType] = addItem(prep.items, data);
    prep.updatedMembers[prep.memberIndex] = prep.member;

    set({ household: { ...get().household, members: prep.updatedMembers } });
  },

  editCollectionItem: ({ memberId, collectionType, itemId, data }: EditCollectionItemArgs) => {
    const prep = prepareMemberCollectionForUpdate(get().household.members, memberId, collectionType);
    if (!prep) return; // Member not found

    prep.member[collectionType] = editItem(prep.items, itemId, data);
    prep.updatedMembers[prep.memberIndex] = prep.member;

    set({ household: { ...get().household, members: prep.updatedMembers } });
  },

  deleteCollectionItem: ({ memberId, collectionType, itemId }: DeleteCollectionItemArgs) => {
    const prep = prepareMemberCollectionForUpdate(get().household.members, memberId, collectionType);
    if (!prep) return; // Member not found

    prep.member[collectionType] = deleteItem(prep.items, itemId);
    prep.updatedMembers[prep.memberIndex] = prep.member;

    set({ household: { ...get().household, members: prep.updatedMembers } });
  },
});
