import { Member, Income, Asset } from "../types"

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



// Utility to prepare member and collection for modification
export const prepareMemberCollectionForUpdate = (members: Member[], memberId: string, collectionName: 'income' | 'assets') => {
  const memberIndex = findMemberIndex(members, memberId);
  if (memberIndex === -1) return null; // Member not found

  let updatedMembers = [...members];
  let member = { ...updatedMembers[memberIndex] };
  let items = member[collectionName] || [];

  return { updatedMembers, member, memberIndex, items };
};