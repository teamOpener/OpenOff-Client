import Text from 'components/common/Text/Text';
import CalendarCard from 'components/eventMap/cards/CalendarCard/CalendarCard';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import datePickScreenStyles from './DatePickScreen.style';

const DatePickScreen = () => {
  const [startDay, setStartDay] = useState<string>('');
  const [endDay, setEndDay] = useState<string>('');
  return (
    <View style={datePickScreenStyles.container}>
      <View style={datePickScreenStyles.buttonContainer}>
        <TouchableOpacity style={datePickScreenStyles.button}>
          <Text variant="body2" color="white">
            이번 주
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={datePickScreenStyles.buttonCenter}>
          <Text variant="body2" color="white">
            다음 주
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={datePickScreenStyles.button}>
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
    </View>
  );
};

export default DatePickScreen;
