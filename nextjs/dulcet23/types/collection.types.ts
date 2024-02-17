import {
  Asset,
  Income
} from '@/types'

export const Collections {
  Assets = 'assets',
  Incomes = 'incomes',
}

const collectionType = {
  income: typeof Collection<Income>,
  asset: typeof Collection<Asset>
}

interface Collection<T> {
  type: typeof T
  addItem(key: string, item: T) : void
  removeItem(key: string) : void
  items()
}


class IncomeCollection implements Collection<Income> {
  store: IncomeStore

  addItem(key: string, item: Income){
    store.addIncomeItem(item);
  }

  items(){
    return store.income.listAll();
  }

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


// Adjust HouseholdState interface to use these specific types
export interface HouseholdState {
  household: Household;
  addMember: (newMemberData: Member) => void;
  editMember: ({ memberId, data }: EditMemberArgs) => void;
  deleteMember: (memberId: string) => void;
  addCollection: (params: Collection<T>) => void;
  getCollections: () => Collection<T>[];
  getCollection: (collectionType: string) => Collection<T>[];
}

class HouseholdState {
  household: HouseholdStore;
  addMember(newMemberData: Member) => {
    household.members.push(newMemberData)
  }

  
  ...
}
houseState.getCollection(Income'.addItem(someIncome)

// What collection might be possibly required?
// answered in CollectionTable


// Do schemas contain any fields from this collection?


// Which canonical fields does this schema rely on?


// Which fields are always required?
// CollectionType mapping?



// Do these fields already have values in the store?
// Edit mode only
// CollectionType mapping?



// What are the details for all the UI fields that might be rendered for this CollectionType?
// CollectionType mapping


// limitFields




// Use field type and possibly store values to pass defaultValues to useForm()




// Render UI fields

// const CollectionMapping = {
//   assets: { 
//     Item: Asset
//   } 
// }

export enum CollectionItemType {
  Asset = 'asset',
  Income = 'income'
}
