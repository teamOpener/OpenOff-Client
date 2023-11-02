/* eslint-disable react-native/no-inline-styles */
import i18n from 'locales';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import Text from 'components/common/Text/Text';
import CalendarButton from 'components/eventMap/buttons/CalendarButton/CalendarButton';
import CalendarCard from 'components/eventMap/cards/CalendarCard/CalendarCard';
import MENT_EVENT_MAP from 'constants/eventMap/eventMapMessage';
import queryKeys from 'constants/queries/queryKeys';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useEventMapStore } from 'stores/EventMap';
import { colors } from 'styles/theme';
import { dateFormatter } from 'utils/date';
import datePickScreenStyles from './DatePickScreen.style';

type ParamList = {
  datePick: undefined;
};

const DatePickScreen = () => {
  const queryClient = useQueryClient();
  const { setStartEndDate } = useEventMapStore();
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [startDay, setStartDay] = useState<string>('');
  const [endDay, setEndDay] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [active, setActive] = useState<'direct' | 'thisWeek' | 'nextWeek'>(
    'direct',
  );

  const handleInitialize = () => {
    setMarkedDates({});
    setStartEndDate({
      startDay: '',
      endDay: '',
    });
    queryClient.removeQueries(queryKeys.eventKeys.mapList);
    navigation.goBack();
  };

  const handleApply = () => {
    setStartEndDate({
      startDay,
      endDay,
    });
    queryClient.removeQueries(queryKeys.eventKeys.mapList);
    navigation.goBack();
  };

  const makeWeekMarker = (startDate: string, endDate: string) => {
    const startNewDate = new Date(startDate);
    const endNewDate = new Date(endDate);
    const updatedMarkedDates: MarkedDates = {};
    while (startNewDate <= endNewDate) {
      const dateString = startNewDate.toISOString().split('T')[0];
      updatedMarkedDates[dateString] = {
        marked: true,
        color: colors.main,
        textColor: 'white',
        startingDay: dateString === startDate,
        endingDay: dateString === endDate,
      };
      startNewDate.setDate(startNewDate.getDate() + 1); // 다음 날짜로 이동
    }
    setMarkedDates(updatedMarkedDates);
  };

  const handleWeek = (
    startNumber: number,
    endNumber: number,
    type: 'direct' | 'thisWeek' | 'nextWeek',
  ) => {
    const today = new Date();
    setActive(type);
    const monday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (startNumber - today.getDay()),
    );
    const sunday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (endNumber - today.getDay()),
    );
    makeWeekMarker(dateFormatter(monday), dateFormatter(sunday));
    setStartDay(dateFormatter(monday));
    setEndDay(dateFormatter(sunday));
    setStartEndDate({
      startDay: dateFormatter(monday),
      endDay: dateFormatter(sunday),
    });
  };

  const handleDirect = () => {
    setMarkedDates({});
    setActive('direct');
  };

  return (
    <View style={datePickScreenStyles.container}>
      <Text variant="h3" color="white" style={datePickScreenStyles.dateTitle}>
        {i18n.t('event_map.date_picker.title')}
      </Text>
      <View style={datePickScreenStyles.buttonContainer}>
        <TouchableOpacity
          style={{
            ...datePickScreenStyles.button,
            backgroundColor:
              active === 'thisWeek' ? colors.main : 'transparent',
          }}
          onPress={() => handleWeek(0, 6, 'thisWeek')}
        >
          <Text variant="body2" color="white">
            {i18n.t('event_map.date_picker.this_week')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...datePickScreenStyles.buttonCenter,
            backgroundColor:
              active === 'nextWeek' ? colors.main : 'transparent',
          }}
          onPress={() => handleWeek(7, 13, 'nextWeek')}
        >
          <Text variant="body2" color="white">
            {i18n.t('event_map.date_picker.next_week')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...datePickScreenStyles.button,
            backgroundColor: active === 'direct' ? colors.main : 'transparent',
          }}
          onPress={handleDirect}
        >
          <Text variant="body2" color="white">
            {i18n.t('event_map.date_picker.direct')}
          </Text>
        </TouchableOpacity>
      </View>
      <CalendarCard
        startDay={startDay}
        endDay={endDay}
        markedDates={markedDates}
        setEndDay={setEndDay}
        setStartDay={setStartDay}
        setMarkedDates={setMarkedDates}
      />
      <View style={datePickScreenStyles.controlButtonContainer}>
        <CalendarButton
          label={i18n.t('event_map.reset')}
          backgroundColor="transparent"
          color="grey"
          borderColor={colors.grey}
          handleClick={handleInitialize}
          width={130}
        />
        <CalendarButton
          label={i18n.t('event_map.apply')}
          backgroundColor={colors.main}
          color="white"
          marginLeft={10}
          handleClick={handleApply}
          width={210}
        />
      </View>
    </View>
  );
};

export default DatePickScreen;
