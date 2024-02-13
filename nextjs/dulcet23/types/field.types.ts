export enum Field {
  Checkbox = 'Checkbox',
  DateInput = 'DateInput',
  PhoneInput = 'PhoneInput',
  Select = 'Select',
  SSN = 'SSN',
  Radio = 'Radio',
  TextInput = 'TextInput',
  Zip = 'Zip'
}

export enum Compound {
  Address = 'Address',
  Person = 'Person'
}

export type BaseField = {
  alwaysInclude?: boolean,
  label?: string,
  disabled?: () => void,
}

export type OptionsField = BaseField & {
  field: Field.Radio | Field.Checkbox | Field.Select;
  options: string[];
};

export type SimpleField = BaseField & {
  field: Field;
};

export type CompoundField = BaseField & {
  field: Compound;
  components?: { [key: string]: SimpleField }; // Assuming compound fields contain simple fields
};

// Union type for all field variations
export type FieldVariant = CompoundField | SimpleField;

export type FieldSpec = {
  [K in string]: FieldVariant;
};

export type CompoundStructure = {
  [K in Compound]?: { [key: string]: SimpleField };
};