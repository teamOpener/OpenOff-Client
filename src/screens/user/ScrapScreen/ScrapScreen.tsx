import ScrapEventList from 'components/user/lists/ScrapEventList/ScrapEventList';
import { useBookmarkEventLists } from 'hooks/queries/bookmark';
import { View } from 'react-native';
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
    </View>
  );
};

export default ScrapScreen;
