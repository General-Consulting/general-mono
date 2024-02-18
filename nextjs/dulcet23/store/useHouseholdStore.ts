import { create } from "zustand"

import collectionActions from "./collectionActions"
import memberActions from "./memberActions"
import { HouseholdState } from "@/types"


export const useHouseholdStore = create<HouseholdState>((set, get) => ({
  household: { members: [] },
  ...collectionActions(set, get),
  ...memberActions(set, get),
}));