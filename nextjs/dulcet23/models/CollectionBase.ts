import { 
  Collection,
  CollectionConstant,
  CollectionNameToTypeMap,
  ReverseMapping 
} from "@/types"

abstract class CollectionBase<C extends Collection> {
  collectionName: ReverseMapping<C, CollectionNameToTypeMap>;
  requiredFields: (keyof C)[];
  subsetFields: (keyof C)[];
  uiFields: CollectionConstant<C>;

  constructor({
    collectionName,
    requiredFields, 
    subsetFields,
    uiFields
  }: {
    collectionName: ReverseMapping<C, CollectionNameToTypeMap>
    requiredFields: (keyof C)[],
    subsetFields: (keyof C)[],
    uiFields: CollectionConstant<C>
  }) {
    this.collectionName = collectionName
    this.requiredFields = requiredFields
    this.subsetFields = subsetFields
    this.uiFields = uiFields
  }

  getDefaultValues(): Partial<Record<string, any>> {
    const defaults: Partial<Record<string, any>> = {};
    // Object.keys(this.fieldsMetadata).forEach(field => {
    //   defaults[field] = this.fieldsMetadata[field].defaultValue || null;
    // });
    return defaults;
  }

  getFieldsToDisplay(schemaFields: string[]): string[] {
    return ['dumb', 'bunny']
    // return this.subsetFields.filter(field => schemaFields.includes(field) || this.requiredFields.includes(field));
  }
}

export default CollectionBase