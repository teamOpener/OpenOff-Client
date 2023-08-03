const getPartOfAddress = (
  roadAddress: string,
  detailAddress: string,
): string => {
  if (detailAddress.trim() !== '') {
    return detailAddress;
  }

  const addressParts = roadAddress.split(' ');
  const slicedAddress = addressParts.slice(2).join(' ');
  return slicedAddress;
};

export default getPartOfAddress;
