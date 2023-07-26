import EventRowCard from 'components/home/cards/EventRowCard/EventRowCard';
import { FlatList } from 'react-native';
import { Event } from 'types/event';

interface Props {
  eventList: Event[];
}

const EventRowCardList = ({ eventList }: Props) => {
  return (
    <FlatList
      numColumns={1}
      data={eventList}
      renderItem={(event) => (
        <EventRowCard key={event.item.id} event={event.item} />
      )}
      // ListFooterComponent={isFetching ? <EventRowCardSkeleton /> : undefined}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        return false;
      }}
    />
  );
};

export default EventRowCardList;
