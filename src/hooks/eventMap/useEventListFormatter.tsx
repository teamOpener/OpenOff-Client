import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Coordinate, MapEvent } from 'types/event';
import getDistanceCoordinate from 'utils/coordinate';

interface SortInfo {
  dialog: boolean;
  value: string;
}

const useEventListFormatter = (
  sort: SortInfo,
  currentCoordinate: Coordinate,
  clickedMarker?: number,
  eventList?: MapEvent[],
) => {
  const firstMapLoadChecker =
    currentCoordinate.latitude === 0 && currentCoordinate.longitude === 0;

  const sortEventList = (notSortEventList: MapEvent[]) => {
    let sortedEventList = notSortEventList;
    if (sort.value === 'date') {
      sortedEventList = notSortEventList?.sort((a, b) =>
        dayjs(a.eventDateList[0]).isAfter(dayjs(b.eventDateList[0])) ? 1 : -1,
      );
    }

    if (sort.value === 'distance') {
      sortedEventList = notSortEventList?.sort((a, b) => {
        const firstDistance = a.distance ?? -1;
        const secondDistance = b.distance ?? -1;
        if (firstDistance > secondDistance) return 1;
        if (firstDistance < secondDistance) return -1;
        return 0;
      });
    }

    return sortedEventList;
  };

  const makeDistance = (eventDistanceList?: MapEvent[]) => {
    console.log(currentCoordinate);
    if (!eventDistanceList) return [];
    return eventDistanceList.map((eventElement) => {
      // eslint-disable-next-line no-param-reassign
      eventElement.distance = getDistanceCoordinate(
        {
          latitude: eventElement.latitude,
          longitude: eventElement.longitude,
        },
        currentCoordinate,
      );
      return eventElement;
    });
  };

  const computedEventList = useMemo<MapEvent[]>(() => {
    if (!clickedMarker) return sortEventList(makeDistance(eventList));
    return makeDistance(
      eventList?.filter((event) => event.id === clickedMarker),
    );
  }, [clickedMarker, eventList, sort.value, firstMapLoadChecker]);

  return { sortEventList, makeDistance, computedEventList };
};

export default useEventListFormatter;
