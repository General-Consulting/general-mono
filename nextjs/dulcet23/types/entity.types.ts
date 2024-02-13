/* Entities describing compound fields
 * E.g. Address, PersonName
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PersonName {
  first: string;
  middle?: string;
  last: string;
  maiden?:string;
}


/* Entities describing items in collections
 * E.g. Income, Asset
 */
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


/* Entity for Member
 * Includes its own fields, plus collections like Income
 */

export interface Member {
  id: string;
  name: PersonName;
  dob: string; // Format: YYYY-MM-DD for PostgreSQL optimization
  ssn: string; 
  income?: Income[];
  assets?: Asset[];
}