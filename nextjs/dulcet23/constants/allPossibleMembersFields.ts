import {
  Field, 
  FieldSpec 
} from "@/types"


const allPossibleMemberFields: FieldSpec = {
  id: { field: Field.Id },
  name: { field: Field.Person },
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


