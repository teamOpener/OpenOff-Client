import moment from 'moment';
import { Dispatch, SetStateAction, useState } from 'react';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { colors } from 'styles/theme';
import { MarkedDates } from 'react-native-calendars/src/types';
import calendarCardStyles from './CalendarCard.style';

interface Props {
  startDay: string;
  endDay: string;
  markedDates: MarkedDates | undefined;
  setEndDay: Dispatch<SetStateAction<string>>;
  setStartDay: Dispatch<SetStateAction<string>>;
  setMarkedDates: Dispatch<SetStateAction<MarkedDates>>;
}
LocaleConfig.locales.kr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'kr';
interface DayForm {
  [key: string]: any;
}

const CalendarCard = ({
  startDay,
  endDay,
  markedDates,
  setEndDay,
  setStartDay,
  setMarkedDates,
}: Props) => {
  const handleDayPress = (day: DateData) => {
    if (startDay && !endDay) {
      const date: DayForm = {
        marked: false,
        color: '',
        textColor: '',
        startingDay: false,
        endingDay: false,
      };
      for (
        const formatStartDay = moment(startDay);
        formatStartDay.isSameOrBefore(day.dateString);
        formatStartDay.add(1, 'days')
      ) {
        date[formatStartDay.format('YYYY-MM-DD')] = {
          marked: true,
          color: colors.main,
          textColor: 'white',
        };

        if (formatStartDay.format('YYYY-MM-DD') === startDay)
          date[formatStartDay.format('YYYY-MM-DD')].startingDay = true;
        if (formatStartDay.format('YYYY-MM-DD') === day.dateString)
          date[formatStartDay.format('YYYY-MM-DD')].endingDay = true;
      }
      setMarkedDates(date);
      setEndDay(day.dateString);
    } else {
      setStartDay(day.dateString);
      setEndDay('');
      setMarkedDates({
        [day.dateString]: {
          marked: true,
          color: colors.main,
          textColor: 'white',
          startingDay: true,
          endingDay: true,
        },
      });
    }
  };
  return (
    <Calendar
      style={calendarCardStyles.container}
      onDayPress={handleDayPress}
      monthFormat="yyyy MMM"
      hideDayNames={false}
      markingType="period"
      markedDates={markedDates}
      theme={{
        calendarBackground: colors.background,
        backgroundColor: colors.background,
        selectedDayBackgroundColor: '#646464',
        selectedDayTextColor: colors.white,
        monthTextColor: colors.white,
        dayTextColor: colors.white,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 16,
        arrowColor: '#e6e6e6',
        dotColor: colors.main,
      }}
    />
  );
};

export default CalendarCard;
