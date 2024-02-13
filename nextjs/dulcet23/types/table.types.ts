import { WithId } from "./common.types"
import {
  Asset,
  Income, 
  PersonName 
} from "./entity.types"


/* Subset types for Member various Collections
 * Hooks in `store` directory return subsets
 * Subsets are used to display UI tables and navlinks
 */

export type MemberSubset = {
  id: string;
  firstName: PersonName['first'];
  lastName: PersonName['last'];
};


// Income subset: id is required; sourceName, amount, frequency
// export type IncomeSubset = WithId<Income, 'sourceName' | 'amount' | 'frequency'>;
export type IncomeSubset = WithId<Income, 'sourceName'>;

// Asset subset: id is required; assetType, assetName, value
// export type AssetSubset = WithId<Asset, 'assetType' | 'assetName' | 'value'>;
export type AssetSubset = WithId<Asset, 'assetType'>;

// Any of the above subsets can be used in the table that displays data
export type TableData = MemberSubset[] | IncomeSubset[] | AssetSubset[]
