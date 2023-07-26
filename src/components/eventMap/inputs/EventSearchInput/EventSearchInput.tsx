import Icon from 'components/common/Icon/Icon';
import { StackMenu } from 'constants/menu';
import useNavigator from 'hooks/navigator/useNavigator';
import { memo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEventMapStore } from 'stores/EventMap';
import { colors } from 'styles/theme';
import eventSearchInput from './EventSearchInput.style';

interface Props {
  handleSearch: (value: string) => void;
}

const EventSearchInput = ({ handleSearch }: Props) => {
  const { stackNavigation } = useNavigator();
  const { startEndDate } = useEventMapStore();
  const [searchValue, setSearchValue] = useState<string>('');
  const handleCalendar = () => {
    stackNavigation.navigate(StackMenu.DatePick);
  };
  return (
    <View style={eventSearchInput.absoluteContainer}>
      <View style={eventSearchInput.container}>
        <TouchableOpacity
          onPress={() => handleSearch(searchValue)}
          style={eventSearchInput.searchButton}
        >
          <Icon name="IconSearch" size={21} fill="background" />
        </TouchableOpacity>

        <TextInput
          onChangeText={(value) => setSearchValue(value)}
          style={eventSearchInput.searchInput}
          placeholder="지역, 이벤트 이름, 주최자 검색"
          placeholderTextColor={colors.grey}
        />

        {startEndDate.endDay && startEndDate.startDay && (
          <View style={eventSearchInput.textContainer}>
            <Text style={eventSearchInput.calendarText}>{`${parseInt(
              startEndDate.startDay.substring(6, 8),
              10,
            )}월 ${parseInt(
              startEndDate.startDay.substring(8, 10),
              10,
            )}일`}</Text>
            <Text style={eventSearchInput.calendarText}>-</Text>
            <Text style={eventSearchInput.calendarText}>{`${parseInt(
              startEndDate.endDay.substring(6, 8),
              10,
            )}월 ${parseInt(
              startEndDate.endDay.substring(8, 10),
              10,
            )}일`}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleCalendar}
          style={eventSearchInput.calendarButton}
        >
          <Icon name="IconCalendar" size={18} fill="background" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(EventSearchInput);
