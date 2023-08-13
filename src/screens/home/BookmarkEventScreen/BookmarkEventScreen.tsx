import EventRowCardList from 'components/home/lists/EventRowCardList/EventRowCardList';
import { View } from 'react-native';
import { useBookmarkEventLists } from 'hooks/queries/bookmark';
import bookmarkEventScreenStyles from './BookmarkEventScreen.style';

const BookmarkEventScreen = () => {
  const {
    data: bookmarkEventLists,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useBookmarkEventLists();

  const handleEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <View style={bookmarkEventScreenStyles.container}>
      <EventRowCardList
        pageData={bookmarkEventLists}
        isFetching={isFetching}
        isLoading={isLoading}
        handleEndReached={handleEndReached}
      />
    </View>
  );
};

export default BookmarkEventScreen;
