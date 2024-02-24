import { IsUnion } from "./common.types";
import { Address } from "./entity.types";
import { 
  CompoundField, 
  OptionsField, 
  SimpleField, 
} from "./field.types";

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

export type Collection = Asset | Income

export type CollectionConstant<C extends Collection> = {
  [K in keyof Omit<C, 'id'>]: IsUnion<C[K]> extends true
    ? OptionsField
    : C[K] extends string | number
      ? SimpleField
      : CompoundField
};

