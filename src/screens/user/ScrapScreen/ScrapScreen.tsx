import { FlatList, ScrollView, View } from 'react-native';
import EventCard from 'components/home/cards/EventCard/EventCard';
import eventList from 'mocks/lists/eventList';
import Spacing from 'components/common/Spacing/Spacing';
import { useBookmarkEventLists } from 'hooks/queries/bookmark';
import ScrapEventList from 'components/user/lists/ScrapEventList/ScrapEventList';
import scrapScreenStyles from './ScrapScreen.style';

const ScrapScreen = () => {
  const {
    data: bookmarkEvent,
    isFetched,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useBookmarkEventLists();

  const handleEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <View style={scrapScreenStyles.container}>
      <ScrapEventList
        pageData={bookmarkEvent}
        isFetching={isFetched}
        isLoading={isLoading}
        handleEndReached={handleEndReached}
      />

      <Spacing height={100} />
    </View>
  );
};

export default ScrapScreen;
