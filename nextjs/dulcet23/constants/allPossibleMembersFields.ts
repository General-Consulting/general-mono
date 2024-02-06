import {
  Compound,
  Field, 
  FieldSpec 
} from "@/types"


export const allPossibleMemberFields: FieldSpec = {
  id: { field: Field.Id },
  name: { field: Compound.Person },
  dob: { 
    field: Field.DateInput, 
    label: "Date of Birth",
    alwaysInclude: true
  },
  ssn: { 
    field: Field.SSN,
    label: 'Social Security Number'
  },
}


