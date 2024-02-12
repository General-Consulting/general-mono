import { 
  CompoundStructure,
  Compound,
  Field 
} from "@/types"

export const compoundStructures: CompoundStructure = {
  [Compound.Address]: {
    street: { field: Field.TextInput },
    city: { field: Field.TextInput },
    state: { field: Field.TextInput },
    // state: { field: Field.Select, label: "State", options: ["State1", "State2"] }, // Add more states as needed
    zipCode: { field: Field.Zip, label: "Zip Code" }
  },

  [Compound.Person]: {
    first: { field: Field.TextInput },
    middle: { field: Field.TextInput },
    last: { field: Field.TextInput },
    maiden: { field: Field.TextInput },
  }

  // Define other standard structures here if needed
};
