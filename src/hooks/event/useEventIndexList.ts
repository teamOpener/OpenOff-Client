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

  return {
    eventDateArray,
    sortedEventDateArray,
    filterEventsBySelectedDate,
  };
};

export default useEventIndexList;
