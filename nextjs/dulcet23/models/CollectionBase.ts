type FieldMetadata = { /* define structure */ };

abstract class CollectionBase {
  abstract collectionName: string;
  abstract requiredFields: string[];
  abstract subsetFields: string[];
  abstract fieldsMetadata: Record<string, FieldMetadata>;

  getDefaultValues(): Partial<Record<string, any>> {
    const defaults: Partial<Record<string, any>> = {};
    Object.keys(this.fieldsMetadata).forEach(field => {
      defaults[field] = this.fieldsMetadata[field].defaultValue || null;
    });
    return defaults;
  }

  getFieldsToDisplay(schemaFields: string[]): string[] {
    return this.subsetFields.filter(field => schemaFields.includes(field) || this.requiredFields.includes(field));
  }
}

export default CollectionBase