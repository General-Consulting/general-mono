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


// OptionObject used in various `validateOptions` functions inside field constant files 
export type OptionObject<T> = { value: T; label: string };

export type FlexibleOption = string | { label: string; value: string };
export type FlexibleOptions = FlexibleOption[]


export type OptionFieldTypes = Field.Radio | Field.Checkbox | Field.Select;
export type OptionsField = BaseField & {
  field: OptionFieldTypes;
  options: FlexibleOptions;
};

export type SimpleField = BaseField & {
  field: Exclude<Field, OptionFieldTypes>;
};

export type CompoundField = BaseField & {
  field: Compound;
  components?: { [key: string]: SimpleField }; // Assuming compound fields contain simple fields
};

// Union type for all field variations
export type FieldVariant = CompoundField | OptionsField | SimpleField;

export type FieldSpec = {
  [K in string]: FieldVariant;
};

export type CompoundStructure = {
  [K in Compound]: { [key: string]: SimpleField | OptionsField };
};