import CollectionBase from "@/models/CollectionBase";

import { IsUnion } from "./common.types";
import { Address } from "./entity.types";
import { 
  CompoundField, 
  OptionsField, 
  SimpleField, 
} from "./field.types";

/* Specific collection types
 * =========================
 * A collection refers to a grouping of fields that 
 * naturally relate to a particular household member.
 * For example, a given household member may have one 
 * or more incomes, one or more assets, etc.  And each
 * income or asset consists of related information.
 * The specific pieces of information associated with
 * any given Income or Asset, etc. are defined here.
 */ 

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

/* Aggregate collection types
 * ==========================
 * This section includes types that aggregate individual 
 * collection items, such as Asset or Income, into unions
 * and mappings.  The `CollectionNameToTypeMap` underpins
 * a lot of other types and type safety throughout the app.
 */ 
export interface CollectionNameToTypeMap {
  income: Income;
  asset: Asset;
}

export type ValidCollectionName = keyof CollectionNameToTypeMap;
export type ValidCollectionNames = ValidCollectionName[]

export type Collection = Asset | Income

/* Collection Class Types
 * ======================
 * These types are fundamentally about working with the
 * each collection class/model, as well as the factory function
 * responsible for creating an instant of class based on 
 * the `collectionName` passed to the function.
 */  

// Define a type for the constructor of each collection class
export type CollectionConstructor<T extends Collection> = new () => CollectionBase<T>;

// Define a mapping type that relates each ValidCollectionName to its constructor type
export type CollectionClassMap = {
  [K in ValidCollectionName]: CollectionConstructor<CollectionNameToTypeMap[K]>;
};


/* `CollectionConstant` & derived fields types
 * ===========================================
 * Used by constants in the `/constants` directory, such
 * as `incomeFields`.  These constants define the details
 * needed to render the UI form fields.  The constants are
 * referenced by their corresponding model/class, such as
 * `IncomeClass`.
 */ 
export type CollectionConstant<C extends Collection> = {
  [K in keyof Omit<C, 'id'>]: IsUnion<C[K]> extends true
    ? OptionsField
    : C[K] extends string | number
      ? SimpleField
      : CompoundField
};

export type IncomeFieldsType = CollectionConstant<Income>
export type AssetFieldsType = CollectionConstant<Asset>

