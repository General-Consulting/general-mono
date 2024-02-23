import { FlexibleOption } from "@/types";

const normalizeFlexibleOption = (option: FlexibleOption) => {
  if (typeof option === 'string') {
    return {
      label: option,
      value: option
    }
  } else {
    return option
  }
}

export default normalizeFlexibleOption
