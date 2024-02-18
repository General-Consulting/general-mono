// collectionActions.ts
import { StoreApi } from 'zustand';

import { 
  HouseholdState, 
  AddCollectionItemParams,
  CollectionNameToTypeMap, 
  EditCollectionItemParams, 
  DeleteCollectionItemParams,
  // IncomeSubset,
  // AssetSubset 
} from '@/types';
import { prepareMemberCollectionForUpdate } from './utils';

// Mapping interface
interface CollectionTypeMap {
  income: IncomeSubset[];
  assets: AssetSubset[];
  // Add new mappings here as your application grows
}


const collectionActions = (
  set: StoreApi<HouseholdState>['setState'],
  get: StoreApi<HouseholdState>['getState'],
) => ({

  addCollectionItem: <
    T extends keyof CollectionNameToTypeMap
  >({ 
    memberId, 
    collectionName, 
    data 
  }: AddCollectionItemParams<T>) => {
    const prep = prepareMemberCollectionForUpdate(get().household.members, memberId, collectionName);
    if (!prep) return;

    // Directly incorporate addItem functionality here
    // If the collection doesn't exist, initialize it as an empty array
    const updatedCollection = [...(prep.member[collectionName] || []), data];
    prep.member[collectionName] = updatedCollection;
    prep.updatedMembers[prep.memberIndex] = prep.member;

    set({ household: { ...get().household, members: prep.updatedMembers } });
  },

  editCollectionItem: <
    T extends keyof CollectionNameToTypeMap
  >({
    memberId,
    collectionName,
    itemId,
    data,
  }: EditCollectionItemParams<T>) => {

  editCollectionItem: ({ memberId, collectionName, itemId, data }: EditCollectionItemParams) => {
    const prep = prepareMemberCollectionForUpdate(get().household.members, memberId, collectionName);
    if (!prep) return;
  
    // Directly incorporate editItem functionality here
    const updatedCollection = prep.items.map(item => item.id === itemId ? { ...item, ...data } : item);
    prep.member[collectionName] = updatedCollection;
    prep.updatedMembers[prep.memberIndex] = prep.member;
  
    set({ household: { ...get().household, members: prep.updatedMembers } });
  },

  deleteCollectionItem: ({ memberId, collectionName, itemId }: DeleteCollectionItemParams) => {
    const prep = prepareMemberCollectionForUpdate(get().household.members, memberId, collectionName);
    if (!prep) return;
  
    // Directly incorporate deleteItem functionality here
    const updatedCollection = prep.items.filter(item => item.id !== itemId);
    prep.member[collectionName] = updatedCollection;
    prep.updatedMembers[prep.memberIndex] = prep.member;
  
    set({ household: { ...get().household, members: prep.updatedMembers } });
  },


  getCollectionSubset: ({ memberId, collectionName }: UseCollectionProps): CollectionTypeMap[T] => {
    const state = get();
    const member = state.household.members.find(m => m.id === memberId);
    if (!member) return [] as CollectionTypeMap[T];

    switch (collectionName) {
      case 'income':
        return (member.income?.map(({ id, sourceName }) => ({
          id,
          sourceName,
        })) || []) as CollectionTypeMap[T];
      case 'assets':
        return (member.assets?.map(({ id, assetType }) => ({
          id,
          assetType,
        })) || []) as CollectionTypeMap[T];
      // Handle other cases as the application grows
      default:
        return [] as CollectionTypeMap[T];
    }
  },
});

});

export default collectionActions;
