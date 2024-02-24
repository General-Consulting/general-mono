
/* `combineObjects` function
 * =========================
 * A helper function to perform a deep merge of two objects.  
 * Any nested objects are combined in the results.  Any arrays are
 * excluded, so that a key with an array value in `obj2`
 * overwrites an identically named key in `obj1`.
 * 
 * Used in model classes to combine blank & existing default values.
 */ 
export function combineObjects<T extends object>(obj1: T, obj2: T): T {
  // Initialize a result object that will accumulate the combined properties
  const result: any = Array.isArray(obj1) ? [...obj1] : { ...obj1 };

  Object.keys(obj2).forEach((key) => {
    const value1 = result[key];
    const value2 = (obj2 as any)[key];

    if (value1 !== null && value2 !== null && typeof value1 === 'object' && typeof value2 === 'object' && !Array.isArray(value2)) {
      // If both values are objects (excluding arrays), recursively combine them
      result[key] = combineObjects(value1, value2);
    } else {
      // Otherwise, set/overwrite the key in the result with obj2's value
      result[key] = value2;
    }
  });

  return result;
}