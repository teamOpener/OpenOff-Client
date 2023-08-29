import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { MarkedDates, Theme } from 'react-native-calendars/src/types';
import Spacing from 'components/common/Spacing/Spacing';
import { EventDetail } from 'components/eventDetail';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { EventIndexStatisticsDto } from 'models/event/response/EventIndexStatisticsDto';
import { colors } from 'styles/theme';
import useEventIndexList from 'hooks/event/useEventIndexList';

interface Props {
  selectedDate: string;
  setSelectedDate: React.Dispatch<string>;
  selectedIndexId: number | null;
  setSelectedIndexId: React.Dispatch<number | null>;
  eventIndexList?: EventIndexStatisticsDto[];
  maxCapacity: number;
}

const EventCalendar = ({
  selectedDate,
  setSelectedDate,
  selectedIndexId,
  setSelectedIndexId,
  eventIndexList = [],
  maxCapacity,
}: Props) => {
  const theme: Theme = {
    monthTextColor: colors.background,
    arrowColor: colors.main,
    disabledArrowColor: colors.grey,
    textSectionTitleColor: colors.darkGrey,
    dayTextColor: colors.grey,
    todayTextColor: colors.grey,
    textDisabledColor: colors.grey,
    selectedDayBackgroundColor: colors.point,
    selectedDayTextColor: colors.white,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 12,
    textDayFontSize: 16,
  };

  const { eventDateArray, sortedEventDateArray, filterEventsBySelectedDate } =
    useEventIndexList({ eventIndexList });

  const filteredArray = filterEventsBySelectedDate(
    eventIndexList,
    selectedDate,
  );

  const [markedDates, setMarkedDates] = useState<MarkedDates | null>(null);

  const disabledEventIndex = (
    eventIndexItem: EventIndexStatisticsDto,
  ): boolean => {
    if (!eventIndexItem.isApply) {
      return true;
    }
    if (eventIndexItem.approvedUserCount >= maxCapacity) {
      return true;
    }
    return false;
  };

  const handleSelectIndexCard = (eventIndexItem: EventIndexStatisticsDto) => {
    const disabledIdx = disabledEventIndex(eventIndexItem);
    if (!disabledIdx) {
      setSelectedIndexId(eventIndexItem.eventIndexId);
    }
  };

  const updateMarkedDates = () => {
    let newMarkedDates: MarkedDates = {};

    if (markedDates !== null) {
      newMarkedDates = { ...markedDates };
    }

    eventDateArray.forEach((date) => {
      const dateString = dayjs(date).format('YYYY-MM-DD');
      newMarkedDates[dateString] = {
        selected: selectedDate === dateString,
        customStyles: {
          text: {
            color: selectedDate === dateString ? colors.white : colors.black,
          },
        },
      };
    });
    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    if (markedDates === null) {
      return;
    }
    updateMarkedDates();
  }, [selectedDate]);

  useEffect(() => {
    if (markedDates) {
      return;
    }
    updateMarkedDates();
  }, [eventDateArray]);

  return (
    <>
      <Calendar
        monthFormat="yyyy.MM"
        initialDate={sortedEventDateArray[0]}
        minDate={sortedEventDateArray[0]}
        maxDate={sortedEventDateArray[sortedEventDateArray.length - 1]}
        hideExtraDays
        enableSwipeMonths
        markingType="custom"
        markedDates={markedDates ?? undefined}
        theme={theme}
        onDayPress={(date) => {
          setSelectedDate(date.dateString);
        }}
      />

      <Spacing height={20} />

      <SpaceLayout size={10}>
        {filteredArray &&
          filteredArray.map((eventIndex) => (
            <EventDetail.DateSelectButton
              key={eventIndex.eventIndexId}
              disabled={disabledEventIndex(eventIndex)}
              isSelected={eventIndex.eventIndexId === selectedIndexId}
              eventDate={eventIndex.eventDate}
              approvedUserCount={eventIndex.approvedUserCount}
              maxCapacity={maxCapacity}
              onPress={() => handleSelectIndexCard(eventIndex)}
            />
          ))}
      </SpaceLayout>
    </>
  );
};

export default EventCalendar;
