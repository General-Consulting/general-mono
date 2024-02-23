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

export type CompoundEntities = Address | PersonName

