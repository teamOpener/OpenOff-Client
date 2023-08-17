import dayjs from 'dayjs';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Text from 'components/common/Text/Text';
import { useEventDetail } from 'hooks/queries/event';
import { EventDetail, EventDetailScreenLayout } from 'components/eventDetail';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Divider from 'components/common/Divider/Divider';
import HeadText from 'components/common/HeadText/HeadText';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import queryKeys from 'constants/queryKeys';
import { ScrollView } from 'react-native';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Spacing from 'components/common/Spacing/Spacing';
import useNavigator from 'hooks/navigator/useNavigator';
import useEventIndexList from 'hooks/event/useEventIndexList';
import useRouteParams from 'hooks/navigator/useRouteParams';
import useDialog from 'hooks/app/useDialog';
import { useMyInfo } from 'hooks/queries/user';
import { useApplyEvent } from 'hooks/queries/ledger';
import useQnaList from 'hooks/event/useQnaList';
import { BottomTabMenu, StackMenu } from 'constants/menu';
import { QnaTuple } from 'types/event/QnaTuple';
import { ApiErrorResponse } from 'types/ApiResponse';
import { colors } from 'styles/theme';
import eventApplyScreenStyles from './EventApplyScreen.style';

const EventApplyScreen = () => {
  const queryClient = useQueryClient();
  const params = useRouteParams<StackMenu.EventApply>();
  const { tabNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const { data: event } = useEventDetail(params?.id ?? 0);
  const { data: user } = useMyInfo();

  const { getEventDateByIndexId } = useEventIndexList({
    eventIndexList: event?.indexList,
  });
  const { initQnaList, isEmptyAnswer, convertToAnswerInfoArray } = useQnaList({
    extraQuestionList: event?.extraQuestionList,
  });

  const [qnaList, setQnaList] = useState<QnaTuple[]>(initQnaList);

  const handleApplySuccess = () => {
    openDialog({
      type: 'success',
      text: MENT_EVENT_DETAIL.SUCCESS.APPLICATION,
      contents: MENT_EVENT_DETAIL.SUCCESS.APPLICATION_DETAIL,
      callback: () => {
        tabNavigation.navigate(BottomTabMenu.UserEvent);
        queryClient.invalidateQueries(queryKeys.eventKeys.all);
        queryClient.invalidateQueries(queryKeys.bookmarkKeys.all);
        queryClient.invalidateQueries(queryKeys.participantKeys.all);
      },
    });
  };

  const handleApplyError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text:
        error?.response?.data.message ?? MENT_EVENT_DETAIL.ERROR.APPLICATION,
    });
  };

  const { mutateAsync: applyEvent, isLoading: isApplying } = useApplyEvent(
    handleApplySuccess,
    handleApplyError,
  );

  const handleBack = () => {
    // TODO: 뒤로가기 시 주의 모달
  };

  const handleApply = async () => {
    if (!params) {
      return;
    }
    if (isEmptyAnswer(qnaList)) {
      openDialog({
        type: 'validate',
        text: MENT_EVENT_DETAIL.ERROR.ADDITIONAL_INFORMATION,
      });
      return;
    }
    await applyEvent({
      eventIndexId: params.id,
      answerInfoList: convertToAnswerInfoArray(qnaList),
    });
  };

  if (!event || !params) {
    return null;
  }

  return (
    <EventDetailScreenLayout>
      {isApplying && (
        <WithIconLoading
          backgroundColor={colors.background}
          isActive
          text={MENT_EVENT_DETAIL.MAIN.APPLICATION_LOADING}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <EventDetail.TitleText title={event?.title} color="main" />
        <SpaceLayout size={20}>
          <SpaceLayout size={10}>
            <EventDetail.DefaultSimpleList
              title={MENT_EVENT_DETAIL.MAIN.DATE}
              description={dayjs(getEventDateByIndexId(params.idx)).format(
                'YYYY.MM.DD(ddd) HH:mm',
              )}
            />
            <EventDetail.DefaultSimpleList
              title={MENT_EVENT_DETAIL.MAIN.ADDRESS}
              description={`${event.streetLoadAddress} ${event.detailAddress}`}
            />
            <EventDetail.DefaultSimpleList
              title={MENT_EVENT_DETAIL.MAIN.COST}
              description={`${
                MENT_EVENT_DETAIL.MAIN.ADMISSION_FEES
              } ${event.eventFee.toLocaleString()}${
                MENT_EVENT_DETAIL.MAIN.WON
              }`}
            />
          </SpaceLayout>
          <Divider height={1} color="darkGrey" />

          {/* 신청자 정보 */}
          <SpaceLayout size={15}>
            <Text style={eventApplyScreenStyles.subTitle}>
              {MENT_EVENT_DETAIL.MAIN.USER_INFO}
            </Text>

            <SpaceLayout size={10}>
              <EventDetail.DefaultSimpleList
                title={MENT_EVENT_DETAIL.MAIN.NAME}
                description={user?.userInfo.userName ?? ''}
              />
              <EventDetail.DefaultSimpleList
                title={MENT_EVENT_DETAIL.MAIN.BIRTH}
                description={
                  user?.userInfo
                    ? `${user.userInfo.birth.year}.${user.userInfo.birth.month}.${user.userInfo.birth.day}`
                    : ''
                }
              />
              <EventDetail.DefaultSimpleList
                title={MENT_EVENT_DETAIL.MAIN.GENDER}
                description={user?.userInfo.gender === 'MAN' ? '남' : '여'}
              />
            </SpaceLayout>
          </SpaceLayout>
          <Divider height={1} color="darkGrey" />

          {/* 추가 정보 */}
          <SpaceLayout size={15}>
            <Text style={eventApplyScreenStyles.subTitle}>
              {MENT_EVENT_DETAIL.MAIN.ADDITIONAL_INFORMATION}
            </Text>

            <EventDetail.QuestionInput
              qnaList={qnaList}
              setQnaList={setQnaList}
            />
          </SpaceLayout>
          <Divider height={1} color="darkGrey" />

          {/* TODO 개인정보 */}
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
