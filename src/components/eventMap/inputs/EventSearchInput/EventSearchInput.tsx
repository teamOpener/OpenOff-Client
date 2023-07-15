import Icon from 'components/common/Icon/Icon';
import { memo, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { colors } from 'styles/theme';
import { useAppStore } from 'stores/app';
import eventSearchInput from './EventSearchInput.style';

interface Props {
  handleSearch: (value: string) => void;
  handleCalendar: () => void;
}

const EventSearchInput = ({ handleSearch, handleCalendar }: Props) => {
  const { startEndDate } = useAppStore();
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <View style={eventSearchInput.absoluteContainer}>
      <View style={eventSearchInput.container}>
        <TextInput
          onChangeText={(value) => setSearchValue(value)}
          style={eventSearchInput.searchInput}
          placeholder="지역, 이벤트 이름, 주최자 검색"
          placeholderTextColor={colors.grey}
        />
        <TouchableOpacity
          onPress={handleCalendar}
          style={eventSearchInput.calendarButton}
        >
          <Icon name="IconCalendar" size={18} fill="background" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSearch(searchValue)}
          style={eventSearchInput.searchButton}
        >
          <Icon name="IconSearch" size={21} fill="background" />
        </TouchableOpacity>
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
      </View>
    </View>
  );
};

export default memo(EventSearchInput);
