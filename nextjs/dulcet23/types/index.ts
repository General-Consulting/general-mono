// IMPORTANT: When adding new fields to the Field enum, ensure to 
// properly categorize them below and adjust the Exclude in SimpleField 
// and other relevant types to maintain exclusivity.


export enum Field {
  Id = 'FieldId',
  Address = 'Address',
  Checkbox = 'Checkbox',
  DateInput = 'DateInput', // Format: YYYY-MM-DD for PostgreSQL optimization
  Person = 'Person',
  PhoneInput = 'PhoneInput',
  Select = 'Select',
  SSN = 'SSN',
  Radio = 'Radio',
  TextInput = 'TextInput',
  Zip = 'Zip'
}

type BaseField = {
  alwaysInclude?: boolean,
  label?: string,
  disabled?: () => void,
}

type FieldWithId = BaseField & {
  field: Field.Id
}

type OptionsField = BaseField & {
  field: Field.Radio | Field.Checkbox | Field.Select;
  options: string[];
};

type CompoundField = BaseField & {
  field: Field.Person | Field.Address;
  components?: { [key: string]: Omit<BaseField, 'field'> & { field: Field } };
};

// Ensure to exclude any new compound fields from SimpleField
type SimpleField = BaseField & {
  field: Exclude<Field, Field.Id | Field.Radio | Field.Checkbox | Field.Person | Field.Address | Field.Select>;
};

// Union type for all field variations
export type FieldVariant = FieldWithId | OptionsField | CompoundField | SimpleField;

// Utility type to enforce the `id` field requirement
type EnforceIdField<T> = T & {
  id: FieldWithId;
};

// The final FieldSpec type
export type FieldSpec = EnforceIdField<{
  [K in string]: FieldVariant;
}>;


/*
 * Types with more widespread usage
 */ 

export type RecordWithId = Record<string, unknown> & {
  id: string;
};

// This type maps from Field enum values to a structure representing the 
// components of that field, such as in a compound field like Address.
export type ComponentStructure = {
  [K in Field]?: { [key: string]: Omit<FieldVariant, 'field'> & { field: Field } };
};





export interface PersonName {
  firstName: string;
  middleName?: string;
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


export interface PersonName {
  firstName: string;
  middleName?: string;
  lastName: string;
  maidenName?:string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
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
