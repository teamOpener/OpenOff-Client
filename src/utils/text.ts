const getPartOfUserName = (name: string): string => {
  if (name.length < 5) {
    return name;
  }

  const slicedName = name.slice(0, 6);
  const dots = '...';

  return slicedName + dots;
};

export default getPartOfUserName;
