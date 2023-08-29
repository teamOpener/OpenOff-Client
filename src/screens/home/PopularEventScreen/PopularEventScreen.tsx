import { View } from 'react-native';
import { useVogueEventInfiniteLists } from 'hooks/queries/event';
import InfinityEventCardList from 'components/home/lists/InfinityEventCardList/InfinityEventCardList';
import popularEventScreenStyles from './PopularEventScreen.style';

const PopularEventScreen = () => {
  const {
    data: vogueEventList,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useVogueEventInfiniteLists();

  const handleEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <View style={popularEventScreenStyles.container}>
      <InfinityEventCardList
        pageData={vogueEventList}
        isFetching={isFetching}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        handleEndReached={handleEndReached}
        type="popular"
      />
    </View>
  );
};

export default PopularEventScreen;
