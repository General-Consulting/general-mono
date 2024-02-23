// collectionActions.ts
import { StoreApi } from 'zustand';

import { 
  HouseholdState, 
  AddCollectionItemParams,
  CollectionNameToTypeMap, 
  DeleteCollectionItemParams,
  EditCollectionItemParams,
  // GetCollectionSubsetParams,
  GetCollectionItemsParams,
  GetCollectionItemByIdParams, 
  ToArrayTypes,
  Member,
  // IncomeSubset,
  // AssetSubset 
} from '@/types';
import { prepareMemberCollectionForUpdate } from './utils';


const collectionActions = (
  set: StoreApi<HouseholdState>['setState'],
  get: StoreApi<HouseholdState>['getState'],
) => ({

  addCollectionItem: <T extends keyof CollectionNameToTypeMap>({
    memberId,
    collectionName,
    data,
  }: AddCollectionItemParams<T>) => {
    const members = get().household.members
    const prep = prepareMemberCollectionForUpdate<T>({ members, memberId, collectionName });
    if (!prep) return;
  
    const updatedCollection: CollectionNameToTypeMap[T][] = [...(prep.items as CollectionNameToTypeMap[T][]), data];
  
    // Correctly typing the assignment using a more refined approach
    prep.member = {
      ...prep.member,
      [collectionName]: updatedCollection as unknown as Member & { [P in T]?: CollectionNameToTypeMap[T][] }[T]
    };
  
    prep.updatedMembers[prep.memberIndex] = prep.member;
  
    set({ household: { ...get().household, members: prep.updatedMembers } });
  },

  editCollectionItem: <T extends keyof CollectionNameToTypeMap>({
    memberId,
    collectionName,
    collectionItemId,
    data,
  }: EditCollectionItemParams<T>) => {
    const members = get().household.members
    const prep = prepareMemberCollectionForUpdate<T>({ members, memberId, collectionName });
    if (!prep) return;
  
    const updatedCollection: CollectionNameToTypeMap[T][] = prep.items.map(collectionItem => 
      collectionItem.id === collectionItemId ? { ...collectionItem, ...data } : collectionItem
    );
  
    // Correctly typing the assignment using a more refined approach
    // This ensures TypeScript understands the assignment's validity
    prep.member = {
      ...prep.member,
      [collectionName]: updatedCollection as unknown as Member & { [P in T]?: CollectionNameToTypeMap[T][] }[T]
    };
  
    prep.updatedMembers[prep.memberIndex] = prep.member;
  
    set({ household: { ...get().household, members: prep.updatedMembers } });
  },
  

  deleteCollectionItem: <T extends keyof CollectionNameToTypeMap>({
    memberId,
    collectionName,
    collectionItemId,
  }: DeleteCollectionItemParams<T>) => {
    const members = get().household.members
    const prep = prepareMemberCollectionForUpdate<T>({ members, memberId, collectionName });
    if (!prep) return;
  
    const updatedCollection: CollectionNameToTypeMap[T][] = prep.items.filter(collectionItem => collectionItem.id !== collectionItemId) as CollectionNameToTypeMap[T][];
  
    // Correctly typing the assignment using a more refined approach
    prep.member = {
      ...prep.member,
      [collectionName]: updatedCollection as unknown as Member & { [P in T]?: CollectionNameToTypeMap[T][] }[T]
    };
  
    prep.updatedMembers[prep.memberIndex] = prep.member;
  
    set({ household: { ...get().household, members: prep.updatedMembers } });
  },
  
  // getCollectionSubset: <T extends keyof CollectionNameToTypeMap>({
  //   memberId,
  //   collectionName,
  // }: GetCollectionSubsetParams<T>): ToArrayTypes<CollectionNameToTypeMap>[T] => {
  //   const state = get();
  //   const member = state.household.members.find(m => m.id === memberId);
  //   if (!member || !member[collectionName]) {
  //     return [] as ToArrayTypes<CollectionNameToTypeMap>[T];
  //   }
 
  //   // TODO - Add functionality to limit fields

  //   const collection = member[collectionName];
  //   return collection as ToArrayTypes<CollectionNameToTypeMap>[T];
  // },


  getCollectionItems: <T extends keyof CollectionNameToTypeMap>({
    memberId,
    collectionName,
  }: GetCollectionItemsParams<T>): ToArrayTypes<CollectionNameToTypeMap>[T] => {
    const state = get();
    const member = state.household.members.find(m => m.id === memberId);
    if (!member || !member[collectionName]) {
      return [] as ToArrayTypes<CollectionNameToTypeMap>[T];
    }
 
    // TODO - Add functionality to limit fields

    const collection = member[collectionName];
    return collection as ToArrayTypes<CollectionNameToTypeMap>[T];
  },

  getCollectionItemById: <T extends keyof CollectionNameToTypeMap>({ 
    memberId, 
    collectionName, 
    collectionItemId 
  }: GetCollectionItemByIdParams<T>): CollectionNameToTypeMap[T] | undefined => {
    const household = get().household;
    const member = household.members.find(m => m.id === memberId);
    if (!member || !member[collectionName]) {
      return undefined;
    }

    const collection = member[collectionName] as CollectionNameToTypeMap[T][];
    const collectionItem = collection.find(collectionItem => collectionItem.id === collectionItemId);
  
    // Check if the item is undefined before returning
    if (collectionItem === undefined) {
      // Item not found, handle accordingly
      return undefined;
    }
  
    // If item is found, return it
    return collectionItem;
  },

})

export default collectionActions;
