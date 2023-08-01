import Text from 'components/common/Text/Text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';
import { useApplyEvent, useEventDetail } from 'hooks/queries/event';
import { EventDetail, EventDetailScreenLayout } from 'components/eventDetail';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Divider from 'components/common/Divider/Divider';
import HeadText from 'components/common/HeadText/HeadText';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import dayjs from 'dayjs';
import { Alert, ScrollView } from 'react-native';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Spacing from 'components/common/Spacing/Spacing';
import useNavigator from 'hooks/navigator/useNavigator';
import eventApplyScreenStyles from './EventApplyScreen.style';

type EventApplyScreenRouteProp = RouteProp<RootStackParamList, 'EventApply'>;

const EventApplyScreen = () => {
  const { params } = useRoute<EventApplyScreenRouteProp>();
  const { tabNavigation } = useNavigator();

  const { data: event, isLoading } = useEventDetail(params.id);

  const handleSuccess = () => {
    // TODO
    Alert.alert('성공');
    tabNavigation.navigate('Home');
  };

  const handleError = () => {
    // TODO 갑분 마감 등등
  };
  const { mutateAsync: applyEvent } = useApplyEvent(handleSuccess, handleError);

  const handleBack = () => {
    // TODO: 뒤로가기 시 주의 모달
  };

  const handleApply = async () => {
    // TODO 추가 정보 입력 안하면 신청 못하게
    await applyEvent();
  };

  // TODO
  if (isLoading) {
    return null;
  }

  // TODO
  if (event == null) {
    return null;
  }

  return (
    <EventDetailScreenLayout>
      <ScrollView>
        <EventDetail.TitleText title={event?.title} color="main" />

        <SpaceLayout size={20}>
          <SpaceLayout size={10}>
            <EventDetail.DefaultSimpleList
              title={MENT_EVENT_DETAIL.MAIN.DATE}
              description={dayjs(event.indexList[params.idx].eventDate).format(
                'YYYY.MM.DD(ddd) HH:mm',
              )}
            />
            <EventDetail.DefaultSimpleList
              title={MENT_EVENT_DETAIL.MAIN.ADDRESS}
              description={`${event.streetLoadAddress} ${event.detailAddress}`}
            />
            <EventDetail.DefaultSimpleList
              title={MENT_EVENT_DETAIL.MAIN.COST}
              // TODO: 비용 형식
              description={`${MENT_EVENT_DETAIL.MAIN.ADMISSION_FEES} ${event.eventFee}${MENT_EVENT_DETAIL.MAIN.WON}`}
            />
          </SpaceLayout>

          <Divider height={1} color="darkGrey" />

          <SpaceLayout size={15}>
            <Text style={eventApplyScreenStyles.subTitle}>
              {MENT_EVENT_DETAIL.MAIN.USER_INFO}
            </Text>

            <SpaceLayout size={10}>
              <EventDetail.DefaultSimpleList
                title={MENT_EVENT_DETAIL.MAIN.NAME}
                // TODO
                description="고길동"
              />
              <EventDetail.DefaultSimpleList
                title={MENT_EVENT_DETAIL.MAIN.BIRTH}
                // TODO
                description={dayjs(
                  event.indexList[params.idx].eventDate,
                ).format('YYYY.MM.DD')}
              />
              <EventDetail.DefaultSimpleList
                title={MENT_EVENT_DETAIL.MAIN.GENDER}
                // TODO
                description="여"
              />
            </SpaceLayout>
          </SpaceLayout>

          <Divider height={1} color="darkGrey" />

          <SpaceLayout size={15}>
            <Text style={eventApplyScreenStyles.subTitle}>
              {MENT_EVENT_DETAIL.MAIN.ADDITIONAL_INFORMATION}
            </Text>

            {/* TODO: 추가 정보 입력 */}
          </SpaceLayout>

          <Divider height={1} color="darkGrey" />

          <HeadText title={MENT_EVENT_DETAIL.MAIN.PERSONAL_INFORMATION} />
          <HeadText title={MENT_EVENT_DETAIL.MAIN.INSTRUCTIONS} />
        </SpaceLayout>

        <Spacing height={200} />
      </ScrollView>

      <FixedButton
        // TODO: disabled
        // disabled={selectedIdx == null}
        label={MENT_EVENT_DETAIL.MAIN.APPLICATION}
        onPress={handleApply}
      />
    </EventDetailScreenLayout>
  );
};

export default EventApplyScreen;
