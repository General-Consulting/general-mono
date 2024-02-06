import { 
  ComponentStructure,
  Field 
} from "@/types"

export const standardComponentStructures: ComponentStructure = {
  [Field.Address]: {
    street: { field: Field.TextInput, label: "Street" },
    city: { field: Field.TextInput, label: "City" },
    state: { field: Field.TextInput },
    // state: { field: Field.Select, label: "State", options: ["State1", "State2"] }, // Add more states as needed
    zipCode: { field: Field.Zip, label: "Zip Code" }
  },
  // Define other standard structures here if needed
};
