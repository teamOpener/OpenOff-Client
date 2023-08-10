import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { EventIndexInfo } from 'models/ledger/entity/EventIndexInfo';
import dateSelectorStyles from './DateSelector.style';

// TODO 한개일때는 안열리게

interface Props {
  eventIndexInfoList: EventIndexInfo[];
  selectedEventIndexInfo: EventIndexInfo;
  setSelectedEventIndexInfo: React.Dispatch<
    React.SetStateAction<EventIndexInfo | undefined>
  >;
}

const DateSelector = ({
  eventIndexInfoList,
  selectedEventIndexInfo,
  setSelectedEventIndexInfo,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDate = (eventIndexInfo: EventIndexInfo) => {
    setSelectedEventIndexInfo(eventIndexInfo);
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
          {dayjs(selectedEventIndexInfo.eventDate).format(
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
          {eventIndexInfoList.map((dateList, idx) => (
            <TouchableOpacity
              key={dateList.eventIndexId}
              activeOpacity={0.8}
              style={[
                dateSelectorStyles.dateList,
                idx !== 0 && dateSelectorStyles.divider,
              ]}
              onPress={() => handleDate(dateList)}
            >
              <Text
                style={dateSelectorStyles.dateText}
                color={
                  selectedEventIndexInfo.eventIndexId === dateList.eventIndexId
                    ? 'main'
                    : 'grey'
                }
              >
                {dayjs(dateList.eventDate).format('YYYY.MM.DD (ddd) HH시 mm분')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DateSelector;
