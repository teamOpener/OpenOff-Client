import dayjs from 'dayjs';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';
import { useEventDetail } from 'hooks/queries/event';
import { EventDetail, EventDetailScreenLayout } from 'components/eventDetail';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import Spacing from 'components/common/Spacing/Spacing';
import Divider from 'components/common/Divider/Divider';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import FixedButton from 'components/common/FixedButton/FixedButton';
import useNavigator from 'hooks/navigator/useNavigator';
import { ticketListDateFormatter } from 'utils/date';
import eventSelectScreenStyles from './EventSelectScreen.style';

type EventSelectScreenRouteProp = RouteProp<RootStackParamList, 'EventSelect'>;

const EventSelectScreen = () => {
  const { params } = useRoute<EventSelectScreenRouteProp>();
  const { stackNavigation } = useNavigator();

  const { data: event } = useEventDetail(params.id);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const eventDateArray = event?.indexList.map((item) => item.eventDate) ?? [];

  const handleSelect = (idx: number) => {
    // TODO: 날짜 선택
    setSelectedIdx(idx);
  };

  const handelNextStep = () => {
    if (selectedIdx == null) {
      return;
    }

    // TODO
    stackNavigation.navigate('EventApply', {
      id: params.id,
      idx: selectedIdx,
    });
  };

  // TODO
  if (!event) {
    return null;
  }

  return (
    <EventDetailScreenLayout>
      <ScrollView>
        <EventDetail.TitleText title={event?.title} color="main" />

        <SpaceLayout size={10}>
          <EventDetail.DefaultSimpleList
            title={MENT_EVENT_DETAIL.MAIN.DATE}
            description={`${dayjs(eventDateArray[0]).format(
              'YYYY',
            )}.${ticketListDateFormatter(eventDateArray)}`}
          />
          <EventDetail.DefaultSimpleList
            title={MENT_EVENT_DETAIL.MAIN.ADDRESS}
            description={`${event.streetLoadAddress} ${event.detailAddress}`}
          />
          <EventDetail.DefaultSimpleList
            title={MENT_EVENT_DETAIL.MAIN.COST}
            description={`${
              MENT_EVENT_DETAIL.MAIN.ADMISSION_FEES
            } ${event.eventFee.toLocaleString()}${MENT_EVENT_DETAIL.MAIN.WON}`}
          />
        </SpaceLayout>
        <Spacing height={20} />
        <Divider height={1} color="darkGrey" />
        <Spacing height={20} />

        <SpaceLayout
          direction="row"
          size={5}
          style={eventSelectScreenStyles.selectDate}
        >
          <Icon name="IconCalendar" size={18} fill="white" />
          <Text style={eventSelectScreenStyles.selectDateText}>
            {MENT_EVENT_DETAIL.MAIN.SELECT_DATE}
          </Text>
        </SpaceLayout>

        {/* <Spacing height={10} /> */}

        {/* TODO: calendar */}
        <Spacing height={20} />

        {/* TODO: calendar 날짜별 filter */}
        <SpaceLayout size={10}>
          {event.indexList.map((eventIndex) => (
            <EventDetail.DateSelectButton
              key={eventIndex.eventIndexId}
              // TODO: 신청한 날짜, 마감 날짜 등등 disabled 처리
              isSelected={eventIndex.eventIndexId === selectedIdx}
              eventDate={eventIndex.eventDate}
              approvedUserCount={eventIndex.approvedUserCount}
              maxCapacity={event.maxCapacity}
              onPress={() => handleSelect(eventIndex.eventIndexId)}
            />
          ))}
        </SpaceLayout>
      </ScrollView>

      <FixedButton
        // TODO: disabled
        disabled={selectedIdx == null}
        label={MENT_EVENT_DETAIL.MAIN.NEXT}
        onPress={handelNextStep}
      />
    </EventDetailScreenLayout>
  );
};

export default EventSelectScreen;
