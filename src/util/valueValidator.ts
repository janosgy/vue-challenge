export const isValid = (value: any): boolean => {
  return typeof value === "number" && value >= 0;
};
