import { Compound } from "@/types"

export function isCompoundField(value: any): value is Compound {
  return Object.values(Compound).includes(value as Compound);
}