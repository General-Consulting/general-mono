import { Member, Income, Asset } from "../types"

/* 
 * Helper functions for working with the members
 */

// Finds the index of a member by ID
export const findMemberIndex = (members: Member[], memberId: string) =>
    members.findIndex(member => member.id === memberId);

// Finds the index of an income source by ID
export const findIncomeIndex = (incomes: Income[], incomeId: string) =>
    incomes.findIndex(income => income.id === incomeId);

/* 
 * Helper functions for working with the member collections
 * Examples: the income or assets array inside an individual member object
 * Partial structure --> members: [ { ..., income: [...], assets: [...] }, ... ]
 */

// Generic function to add an item to a member's collection (income or assets)
export const addItem = (items: any[], newItem: any) => [...items, newItem];

// Generic function to update an item in a member's collection
export const updateItem = (items: any[], itemId: string, updatedItemData: any) => 
    items.map(item => item.id === itemId ? { ...item, ...updatedItemData } : item);

// Generic function to delete an item from a member's collection
export const deleteItem = (items: any[], itemId: string) => 
    items.filter(item => item.id !== itemId);