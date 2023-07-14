/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Text from 'components/common/Text/Text';
import CalendarButton from 'components/eventMap/buttons/CalendarButton/CalendarButton';
import CalendarCard from 'components/eventMap/cards/CalendarCard/CalendarCard';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAppStore } from 'stores/app';
import { colors } from 'styles/theme';
import datePickScreenStyles from './DatePickScreen.style';

type ParamList = {
  datePick: undefined;
};

const DatePickScreen = () => {
  const { setStartEndDate } = useAppStore();
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [startDay, setStartDay] = useState<string>('');
  const [endDay, setEndDay] = useState<string>('');
  const [active, setActive] = useState<'direct' | 'thisWeek' | 'nextWeek'>(
    'direct',
  );
  const handleInitialize = () => {
    setStartEndDate({
      startDay: '',
      endDay: '',
    });
    navigation.goBack();
  };
  const handleApply = () => {
    setStartEndDate({
      startDay,
      endDay,
    });
    navigation.goBack();
  };
  return (
    <View style={datePickScreenStyles.container}>
      <View style={datePickScreenStyles.buttonContainer}>
        <TouchableOpacity
          style={{
            ...datePickScreenStyles.button,
            backgroundColor:
              active === 'thisWeek' ? colors.main : 'transparent',
          }}
          onPress={() => setActive('thisWeek')}
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
          onPress={() => setActive('nextWeek')}
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
        setEndDay={setEndDay}
        setStartDay={setStartDay}
      />
      <View style={datePickScreenStyles.controlButtonContainer}>
        <CalendarButton
          label="초기화"
          backgroundColor="transparent"
          color="grey"
          borderColor={colors.grey}
          marginLeft={10}
          handleClick={handleInitialize}
          width={130}
        />
        <CalendarButton
          label="적용"
          backgroundColor={colors.main}
          color="white"
          handleClick={handleApply}
          width={210}
        />
      </View>
    </View>
  );
};

export default DatePickScreen;
