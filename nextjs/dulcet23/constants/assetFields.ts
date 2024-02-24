import {
  Asset,
  AssetFieldsType,
  Field,
} from "@/types"
import { createValidateOptionsForCollection } from "@/utils/createValidationOptionsForCollection";


const validateAssetOptions = createValidateOptionsForCollection<Asset>()

/* `assetFields` constant
 * ========================
 * Contains details about all possible fields that might be rendered.
 * The details within this constant are then used by `FieldsFactory` 
 * component to determine how to actually render fields.
 * 
 * Whether or not any fields are rendered is determined by methods 
 * housed within `AssetClass` and `useCollection`, which both make 
 * use of the application schemas of particular applications (e.g. PDFs)
 * to make that decision. 
 */ 
export const assetFields: AssetFieldsType = {
  assetName: { field: Field.TextInput },
  assetType: { field: Field.TextInput },
  value: { field: Field.TextInput },
}

