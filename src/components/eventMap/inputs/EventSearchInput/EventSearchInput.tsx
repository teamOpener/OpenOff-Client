import Icon from 'components/common/Icon/Icon';
import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import eventSearchInput from './EventSearchInput.style';

interface Props {
  handleSearch: (value: string) => void;
  handleCalendar: () => void;
}

const EventSearchInput = ({ handleSearch, handleCalendar }: Props) => {
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
      </View>
    </View>
  );
};

export default EventSearchInput;
