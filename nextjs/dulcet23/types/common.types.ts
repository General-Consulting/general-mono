// Allowed operations for updating collection
export enum Operation {
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit', // Update the value here
}

// Allowed collections associated with a member
export type Collection = 'income' | 'assets' 

// Ensure record has `id` property
export type RecordWithId = Record<string, unknown> & {
  id: string;
};

// Ensure T has an 'id' property -- used with all the collection subsets
export type WithId<T extends { id: string }, Extras> = T & Extras;

