const getNonEmptyStrings = (values: string[]): string[] => {
  const nonEmptyStrings = values.filter((item) => item.trim() !== '');

  return nonEmptyStrings;
};

export default getNonEmptyStrings;
