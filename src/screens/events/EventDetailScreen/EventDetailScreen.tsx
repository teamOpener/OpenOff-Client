import { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';
import { useEventDetail } from 'hooks/queries/event';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { EventDetail, EventDetailScreenLayout } from 'components/eventDetail';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import Spacing from 'components/common/Spacing/Spacing';
import FixedButton from 'components/common/FixedButton/FixedButton';
import { ScrollView } from 'react-native';
import useNavigator from 'hooks/navigator/useNavigator';
import Text from 'components/common/Text/Text';
import { EventDetailTabItem } from 'constants/eventDetail/eventDetailContants';

type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

const EventDetailScreen = () => {
  const { params } = useRoute<EventDetailScreenRouteProp>();
  const { stackNavigation } = useNavigator();

  const { data: event, isLoading } = useEventDetail(params.id);

  const [activeTabName, setActiveTabName] = useState<EventDetailTabItem>(
    EventDetailTabItem.DESCRIPTION,
  );

  const handleShare = () => {
    // TODO 공유하기
  };

  const handleSave = () => {
    // TODO 찜하기
  };

  const handleTab = (name: EventDetailTabItem) => {
    setActiveTabName(name);
  };

  const handleLocation = () => {
    // TODO 지도로 해당 이벤트 ?? 가지고 이동
  };

  const handleApply = () => {
    // TODO: 참여 버튼 막기, 얼마 안남았을 경우 timer 걸기
    stackNavigation.navigate('EventSelect', {
      id: params.id,
    });
  };

  // TODO
  if (isLoading) {
    return null;
  }

  // TODO
  if (!event) {
    return null;
  }

  return (
    <EventDetailScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EventDetail.TitleText title={event.title} />

        <SpaceLayout size={10}>
          <EventDetail.SmallSimpleList
            title={MENT_EVENT_DETAIL.MAIN.ADDRESS}
            description={`${event.streetLoadAddress} ${event.detailAddress}`}
            action={
              <EventDetail.TextButton
                label={MENT_EVENT_DETAIL.MAIN.LOCATION}
                onPress={handleLocation}
              />
            }
          />
          <EventDetail.SmallSimpleList
            title={MENT_EVENT_DETAIL.MAIN.COST}
            // TODO: 쉼표 추가
            description={`입장료 ${event.eventFee}${MENT_EVENT_DETAIL.MAIN.WON}`}
          />
        </SpaceLayout>
        <Spacing height={30} />

        <EventDetail.PosterCarousel images={event.imageList} />
        <Spacing height={20} />

        <EventDetail.DateCardCarousel
          indexList={event.indexList}
          maxCapacity={event.maxCapacity}
        />
        <Spacing height={30} />

        <EventDetail.Tab>
          <EventDetail.TabItem
            label={MENT_EVENT_DETAIL.MAIN.INTRODUCTION_EVENT}
            isActive={activeTabName === EventDetailTabItem.DESCRIPTION}
            onPress={() => handleTab(EventDetailTabItem.DESCRIPTION)}
          />
          <EventDetail.TabItem
            label={MENT_EVENT_DETAIL.MAIN.COMMENTS}
            isActive={activeTabName === EventDetailTabItem.COMMENTS}
            onPress={() => handleTab(EventDetailTabItem.COMMENTS)}
          />
        </EventDetail.Tab>
        <Spacing height={30} />

        {/* TODO: 댓글 탭 만들기 */}
        {/* TODO: 개행 처리 어캐할지 */}
        <Text variant="body2">{event.description}</Text>

        <Spacing height={200} />
      </ScrollView>

      <FixedButton
        label={MENT_EVENT_DETAIL.MAIN.APPLY_PARTICIPATION}
        onPress={handleApply}
      />
    </EventDetailScreenLayout>
  );
};

export default EventDetailScreen;
