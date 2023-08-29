import EventRowCardList from 'components/home/lists/EventRowCardList/EventRowCardList';
import { View } from 'react-native';
import { useVogueEventInfiniteLists } from 'hooks/queries/event';
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
      <EventRowCardList
        pageData={vogueEventList}
        isFetching={isFetching}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        handleEndReached={handleEndReached}
      />
    </View>
  );
};

export default PopularEventScreen;
