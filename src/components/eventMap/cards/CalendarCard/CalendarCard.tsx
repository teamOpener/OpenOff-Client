import i18n from 'locales';
import MENT_EVENT_MAP from 'constants/eventMap/eventMapMessage';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { colors } from 'styles/theme';
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
  monthNames: MENT_EVENT_MAP.DATE_PICKER.MONTH_NAMES,
  monthNamesShort: MENT_EVENT_MAP.DATE_PICKER.MONTH_NAMES,
  dayNames: MENT_EVENT_MAP.DATE_PICKER.DAY_NAMES,
  dayNamesShort: MENT_EVENT_MAP.DATE_PICKER.DAY_NAMES_SHORT,
  today: 'Today',
};
LocaleConfig.locales.en = {
  monthNames: MENT_EVENT_MAP.DATE_PICKER.MONTH_NAMES_EN,
  monthNamesShort: MENT_EVENT_MAP.DATE_PICKER.MONTH_NAMES_EN,
  dayNames: MENT_EVENT_MAP.DATE_PICKER.DAY_NAMES_EN,
  dayNamesShort: MENT_EVENT_MAP.DATE_PICKER.DAY_NAMES_SHORT_EN,
  today: 'Today',
};
LocaleConfig.defaultLocale = i18n.language === 'ko' ? 'kr' : 'en';
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
      key={startDay}
      style={calendarCardStyles.container}
      onDayPress={handleDayPress}
      monthFormat="yyyy MMM"
      hideDayNames={false}
      markingType="period"
      markedDates={markedDates}
      current={startDay}
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
