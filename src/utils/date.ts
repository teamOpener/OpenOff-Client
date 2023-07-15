const calcDay = (dayValue: number) => {
  if (dayValue >= 10) {
    return dayValue;
  }
  return `0${dayValue}`;
};

const dateFormatter = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}-${calcDay(month)}-${calcDay(day)}`;
};

export { calcDay, dateFormatter };
