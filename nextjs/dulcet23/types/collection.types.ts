import { Address } from "./entity.types";

export interface Income {
  id: string;
  sourceName: string;
  sourceAddress: Address;
  incomeType: 'Employment' | 'Other';
  frequency: 'Weekly' | 'Every two weeks' | 'Twice a month' | 'Monthly' | 'Quarterly' | 'Yearly'
  amount: number; 
}
export type Incomes = Income[]

export interface Asset {
  id: string;
  assetName: string;
  assetType: string;
  value: number;
}
export type Assets = Asset[]

// Creating a mapping interface to relate collection names to their respective types
export interface CollectionNameToTypeMap {
  income: Income;
  asset: Asset;
}

export type ValidCollectionName = keyof CollectionNameToTypeMap;
export type ValidCollectionNames = ValidCollectionName[]
