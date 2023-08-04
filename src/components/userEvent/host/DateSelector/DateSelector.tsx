import Text from 'components/common/Text/Text';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import { useState } from 'react';
import dayjs from 'dayjs';
import dateSelectorStyles from './DateSelector.style';

const dateLists: string[] = [
  '2023-07-13T20:00:00',
  '2023-07-14T18:00:00',
  '2023-07-15T21:00:00',
];

// TODO 한개일때는 안열리게

const DateSelector = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDateIdx, setSelectedDateIdx] = useState<number>(0);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDate = (idx: number) => {
    setSelectedDateIdx(idx);
    setIsOpen(false);
  };

  return (
    <View style={dateSelectorStyles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={dateSelectorStyles.mainContainer}
        onPress={handleOpen}
      >
        <Text style={dateSelectorStyles.dateText} color="main">
          {dayjs(dateLists[selectedDateIdx]).format(
            'YYYY.MM.DD (ddd) HH시 mm분',
          )}
        </Text>
        <Icon
          size={14}
          fill="main"
          name={isOpen ? 'IconArrowUp' : 'IconArrowDown'}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={dateSelectorStyles.absoluteContainer}>
          {dateLists.map((dateList, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              style={[
                dateSelectorStyles.dateList,
                idx !== 0 && dateSelectorStyles.divider,
              ]}
              onPress={() => handleDate(idx)}
            >
              <Text
                style={dateSelectorStyles.dateText}
                color={selectedDateIdx === idx ? 'main' : 'grey'}
              >
                {dayjs(dateList).format('YYYY.MM.DD (ddd) HH시 mm분')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DateSelector;
