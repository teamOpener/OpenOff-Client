/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Text from 'components/common/Text/Text';
import CalendarButton from 'components/eventMap/buttons/CalendarButton/CalendarButton';
import CalendarCard from 'components/eventMap/cards/CalendarCard/CalendarCard';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useAppStore } from 'stores/app';
import { colors } from 'styles/theme';
import { dateFormatter } from 'utils/date';
import datePickScreenStyles from './DatePickScreen.style';

type ParamList = {
  datePick: undefined;
};

const DatePickScreen = () => {
  const { setStartEndDate } = useAppStore();
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
  };
  const handleApply = () => {
    setStartEndDate({
      startDay,
      endDay,
    });
    navigation.goBack();
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
    console.log(dateFormatter(monday));
    setStartEndDate({
      startDay: dateFormatter(monday),
      endDay: dateFormatter(sunday),
    });
    navigation.goBack();
  };
  return (
    <View style={datePickScreenStyles.container}>
      <Text variant="h3" color="white" style={datePickScreenStyles.dateTitle}>
        기간
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
            이번 주
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
            다음 주
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...datePickScreenStyles.button,
            backgroundColor: active === 'direct' ? colors.main : 'transparent',
          }}
          onPress={() => setActive('direct')}
        >
          <Text variant="body2" color="white">
            직접 입력
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
          label="초기화"
          backgroundColor="transparent"
          color="grey"
          borderColor={colors.grey}
          handleClick={handleInitialize}
          width={130}
        />
        <CalendarButton
          label="적용"
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
