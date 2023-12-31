import { EventIndexStatisticsDto } from 'models/event/response/EventIndexStatisticsDto';

interface Props {
  eventIndexList?: EventIndexStatisticsDto[];
}

const useEventIndexList = ({ eventIndexList = [] }: Props) => {
  const sortEventDates = (eventDateArray: string[]) => {
    return eventDateArray.sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });
  };

  const filterEventsBySelectedDate = (
    eventIndexListData: EventIndexStatisticsDto[],
    selectedDateData: string,
  ) => {
    return eventIndexListData.filter((item) => {
      const eventDate = new Date(item.eventDate);
      return (
        eventDate.toLocaleDateString() ===
        new Date(selectedDateData).toLocaleDateString()
      );
    });
  };

  const eventDateArray = eventIndexList.map((item) => item.eventDate) ?? [];
  const sortedEventDateArray = sortEventDates(eventDateArray);

  const getEventDateByIndexId = (eventIndexId: number): string | undefined => {
    const eventIndex = eventIndexList.find(
      (item) => item.eventIndexId === eventIndexId,
    )?.eventDate;
    return eventIndex;
  };

  const sortEventsByEventDate = (): EventIndexStatisticsDto[] => {
    return [...eventIndexList].sort((a, b) => {
      return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
    });
  };

  return {
    eventDateArray,
    sortedEventDateArray,
    filterEventsBySelectedDate,
    getEventDateByIndexId,
    sortEventsByEventDate,
  };
};

export default useEventIndexList;
