import {
  Asset,
  Income
} from '@/types'

export enum Collection {
  Assets = 'assets',
  Incomes = 'incomes',
}

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
