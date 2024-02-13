import { useShallow } from "zustand/react/shallow";
import { useHouseholdStore } from "./useHouseholdStore";
import { MemberSubset } from "@/types";

// Custom hook to extract specific member details
const useMembersSubset = (): MemberSubset[] => {
  const members = useHouseholdStore(
    useShallow((state) => state.household.members.map(member => ({
      id: member.id,
      firstName: member.name.first,
      lastName: member.name.last,
      // Assuming MemberSubset type is defined to include 'age', and you have a way to calculate it
      // age: calculateAge(member.dob), // Assuming you have a function to calculate age based on dob
    })))
  );

  // No need for type assertion if the object structure returned from map matches MemberSubset
  return members;
};

export default useMembersSubset;
