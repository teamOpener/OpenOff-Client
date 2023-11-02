import i18n from 'locales';
import Divider from 'components/common/Divider/Divider';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import { EventDetail } from 'components/eventDetail';
import EventEmptyLayout from 'components/eventDetail/layout/EventEmtpyLayout';
import KeyboardAvoidingScreenLayout from 'components/layout/KeyboardAvoidingScreenLayout/KeyboardAvoidingScreenLayout';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { StackMenu } from 'constants/app/menu';
import dayjs from 'dayjs';
import useEventIndexList from 'hooks/event/useEventIndexList';
import useNavigator from 'hooks/navigator/useNavigator';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useEventDetail } from 'hooks/queries/event';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { ticketListDateFormatter } from 'utils/date';
import eventSelectScreenStyles from './EventSelectScreen.style';

const EventSelectScreen = () => {
  const { params } = useStackRoute<StackMenu.EventSelect>();
  const { stackNavigation } = useNavigator();

  const { data: event } = useEventDetail(params.id);

  const { sortedEventDateArray } = useEventIndexList({
    eventIndexList: event?.indexList,
  });

  const [selectedIndexId, setSelectedIndexId] = useState<number | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(event?.indexList[0].eventDate ?? '').format('YYYY-MM-DD'),
  );

  const handelNextStep = () => {
    if (selectedIndexId === null) {
      return;
    }

    stackNavigation.navigate('EventApply', {
      id: params.id,
      idx: selectedIndexId,
    });
  };

  return (
    <KeyboardAvoidingScreenLayout>
      {!event && <EventEmptyLayout />}

      {event && (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <EventDetail.TitleText title={event?.title} color="main" />

            <SpaceLayout size={10}>
              <EventDetail.DefaultSimpleList
                title={i18n.t('date_time')}
                description={`${dayjs(sortedEventDateArray[0]).format(
                  'YYYY',
                )}.${ticketListDateFormatter(sortedEventDateArray)}`}
              />
              <EventDetail.DefaultSimpleList
                title={i18n.t('event_detail.address')}
                description={`${event.streetLoadAddress} ${event.detailAddress}`}
              />
              <EventDetail.DefaultSimpleList
                title={i18n.t('cost')}
                description={`${i18n.t(
                  'event_detail.admission_fees',
                )} ${event.eventFee.toLocaleString()}${i18n.t(
                  'event_detail.won',
                )}`}
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
                {i18n.t('event_detail.select_date')}
              </Text>
            </SpaceLayout>

            <Spacing height={10} />

            <EventDetail.EventCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedIndexId={selectedIndexId}
              setSelectedIndexId={setSelectedIndexId}
              eventIndexList={event.indexList}
              maxCapacity={event.maxCapacity}
            />

            <Spacing height={200} />
          </ScrollView>

          <FixedButton
            disabled={selectedIndexId === null}
            label={i18n.t('next')}
            onPress={handelNextStep}
          />
        </>
      )}
    </KeyboardAvoidingScreenLayout>
  );
};

export default EventSelectScreen;
