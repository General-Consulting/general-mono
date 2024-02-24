import { 
  Collection,
  OptionObject 
} from "@/types";

export function createValidateOptionsForCollection<C extends Collection>() {
  return function<K extends keyof C>(
    key: K, 
    options: Array<C[K] | OptionObject<C[K]>>
  ): Array<C[K] | OptionObject<C[K]>> {
    return options;
  };
}