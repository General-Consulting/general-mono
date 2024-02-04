export interface PersonName {
  firstName: string;
  middleName: string;
  lastName: string;
  maidenName?:string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Income {
  id: string;
  sourceName: string;
  sourceAddress: Address;
  incomeType: 'Employment' | 'Other';
  frequency: 'Weekly' | 'Every two weeks' | 'Twice a month' | 'Monthly' | 'Quarterly' | 'Yearly'
  amount: number; 
}

export interface Asset {
  id: string;
  assetName: string;
  assetType: string;
  value: number;
}


export interface Member {
  id: string;
  name: PersonName;
  dob: string; // Format: YYYY-MM-DD for PostgreSQL optimization
  ssn: string; 
  income?: Income[];
  assets?: Asset[];
}

// The main structure
export interface Household {
  id?: string;
  members: Member[];
  // Other flat data to be defined later
}

/* Types specifically used for the global store
 */
export type Collection = 'income' | 'assets' 
export type Operation = 'add' | 'update' | 'delete'

export interface HouseholdState {
  household: Household,
  addMember: (newMemberData: Member) => void;
  updateMember: (updatedMemberData: Member) => void;
  deleteMember: (memberId: string) => void;
  modifyMemberCollection: (params: { 
    memberId: string, 
    collectionType: Collection, 
    operation: Operation, 
    itemData?: Asset | Income, 
    itemId?: string,
  }) => void;
}

/* Subset of Member and various collections
 * Used for creating display tables
 */

/* Member subset: 
 * `firstName`, `lastName` from PersonName
 * `age`, derived from dob
 * `id` is required
 */ 
export type MemberSubset = {
  id: string;
  firstName: PersonName['firstName'];
  lastName: PersonName['lastName'];
};


// Ensure T has an 'id' property -- used with all the collection subsets
type WithId<T extends { id: string }, Extras> = T & Extras;

// Income subset: id is required; sourceName, amount, frequency
// export type IncomeSubset = WithId<Income, 'sourceName' | 'amount' | 'frequency'>;
export type IncomeSubset = WithId<Income, 'sourceName'>;

// Asset subset: id is required; assetType, assetName, value
// export type AssetSubset = WithId<Asset, 'assetType' | 'assetName' | 'value'>;
export type AssetSubset = WithId<Asset, 'assetType'>;

// Any of the above subsets can be used in the table that displays data
export type TableData = MemberSubset[] | IncomeSubset[] | AssetSubset[]

/* For FieldFactory component, which depends on 
 * data from DB.
 */

export interface FieldData {
  name: string;
  label: string;
  component: 'Input' | 'Checkbox' | 'Radio'; // Add more types as needed
}