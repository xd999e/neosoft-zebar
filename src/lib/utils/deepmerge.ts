export default function deepMergeObjects<T>(
  obj1: T,
  obj2: Partial<T>
): T {
  const result = { ...obj1 } as T;

  for (const key in obj2) {
    if (Object.hasOwnProperty.call(obj2, key)) {
      if (
        typeof obj2[key] === "object" &&
        obj2[key] !== null &&
        Object.hasOwnProperty.call(obj1, key) &&
        typeof obj1[key] === "object" &&
        obj1[key] !== null
      ) {
        result[key] = deepMergeObjects(
          obj1[key],
          obj2[key]
        ) as unknown as T[Extract<keyof T, string>];
      } else {
        result[key] = obj2[key] as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}