import { Asset, Income } from "./collection.types"
import { PersonName } from "./entity.types";

export interface Member {
  id: string;
  name: PersonName;
  dob: string; // Format: YYYY-MM-DD for PostgreSQL optimization
  ssn: string; 
  income?: Income[];
  assets?: Asset[];
}