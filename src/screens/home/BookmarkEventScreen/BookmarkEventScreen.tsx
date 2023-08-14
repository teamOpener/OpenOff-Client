import BookmarkCardList from 'components/home/lists/BookmarkCardList/BookmarkCardList';
import { useBookmarkEventLists } from 'hooks/queries/bookmark';
import { View } from 'react-native';
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
      <BookmarkCardList
        pageData={bookmarkEventLists}
        isFetching={isFetching}
        isLoading={isLoading}
        handleEndReached={handleEndReached}
      />
    </View>
  );
};

export default BookmarkEventScreen;
