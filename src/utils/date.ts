import dayjs from 'dayjs';

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

const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return `${year}.${month}.${day} ${time}`;
};

const serverDateFormatter = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

const ticketListDateFormatter = (dates: string[]): string => {
  const sortedDates = dates.sort((a, b) =>
    dayjs(a).isAfter(dayjs(b)) ? 1 : -1,
  );
  const earliestStartDate = dayjs(sortedDates[0]);
  const latestEndDate = dayjs(sortedDates[sortedDates.length - 1]);

  const formattedStartDate = earliestStartDate.format('MM.DD(ddd)');

  const isMultipleDays = latestEndDate.diff(earliestStartDate, 'day') >= 1;

  let output = '';

  if (isMultipleDays) {
    output = `${formattedStartDate} ~ ${latestEndDate.format('MM.DD(ddd)')}`;
  } else {
    const formattedStartTime = earliestStartDate.format('HH:mm');
    const formattedEndTime = latestEndDate.format('HH:mm');
    if (formattedStartTime !== formattedEndTime) {
      output = `${formattedStartDate} ${formattedStartTime} ~ ${formattedEndTime}`;
    } else {
      output = `${formattedStartDate} ${formattedStartTime}`;
    }
  }

  return output;
};

export {
  calcDay,
  dateFormatter,
  formatDateTime,
  serverDateFormatter,
  ticketListDateFormatter,
};
