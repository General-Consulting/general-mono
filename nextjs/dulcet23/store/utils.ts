import { 
  CollectionNameToTypeMap,
  Member 
} from "@/types"

/* 
 * Helper functions for working with the members
 */

// Finds the index of a member by ID
export const findMemberIndex = (members: Member[], memberId: string) =>
    members.findIndex(member => member.id === memberId);

// // Finds the index of an income source by ID
// export const findIncomeIndex = (incomes: Income[], incomeId: string) =>
//     incomes.findIndex(income => income.id === incomeId);

/* 
 * Helper functions for working with the member collections
 * Examples: the income or assets array inside an individual member object
 * Partial structure --> members: [ { ..., income: [...], assets: [...] }, ... ]
 */

// Type for the function parameters
type PrepareMemberCollectionForUpdateParams<T extends keyof CollectionNameToTypeMap> = {
  members: Member[];
  memberId: string;
  collectionName: T;
};

// Type for the function return value
type PrepareMemberCollectionForUpdateReturn<T extends keyof CollectionNameToTypeMap> = {
  updatedMembers: Member[];
  member: Member & { [P in T]?: CollectionNameToTypeMap[T][] };
  memberIndex: number;
  items: CollectionNameToTypeMap[T][];
} | null;

// Utility to prepare member and collection for modification
export const prepareMemberCollectionForUpdate = <T extends keyof CollectionNameToTypeMap>(
  { members, memberId, collectionName }: PrepareMemberCollectionForUpdateParams<T>
): PrepareMemberCollectionForUpdateReturn<T> => {
  const memberIndex = findMemberIndex(members, memberId);
  if (memberIndex === -1) return null; // Member not found

  let updatedMembers = [...members];
  let member = { 
    ...updatedMembers[memberIndex] 
  } as Member & { [P in typeof collectionName]?: CollectionNameToTypeMap[T][] };
  let items: CollectionNameToTypeMap[T][] = member[collectionName] as CollectionNameToTypeMap[T][] || [];

  return { updatedMembers, member, memberIndex, items };
};