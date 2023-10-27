import i18n from 'locales';
import Divider from 'components/common/Divider/Divider';
import Text from 'components/common/Text/Text';
import { EventDetail } from 'components/eventDetail';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import dayjs from 'dayjs';
import { useEventDetail } from 'hooks/queries/event';
import { useState } from 'react';
// import HeadText from 'components/common/HeadText/HeadText';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Spacing from 'components/common/Spacing/Spacing';
import EventEmptyLayout from 'components/eventDetail/layout/EventEmtpyLayout';
import KeyboardAvoidingScreenLayout from 'components/layout/KeyboardAvoidingScreenLayout/KeyboardAvoidingScreenLayout';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { BottomTabMenu, StackMenu } from 'constants/app/menu';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import useDialog from 'hooks/app/useDialog';
import useEventIndexList from 'hooks/event/useEventIndexList';
import useQnaList from 'hooks/event/useQnaList';
import useNavigator from 'hooks/navigator/useNavigator';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useApplyEvent } from 'hooks/queries/ledger';
import useResetQueries from 'hooks/queries/useResetQueries';
import { useMyInfo } from 'hooks/queries/user';
import { ScrollView } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import { QnaTuple } from 'types/event/QnaTuple';
import eventApplyScreenStyles from './EventApplyScreen.style';

const EventApplyScreen = () => {
  const { params } = useStackRoute<StackMenu.EventApply>();
  const { tabNavigation } = useNavigator();
  const { openDialog } = useDialog();
  const { resetQueries } = useResetQueries();

  const { data: event } = useEventDetail(params.id);
  const { data: user } = useMyInfo({ isLogin: true });

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
      text: i18n.t('event_detail.application_success'),
      contents: i18n.t('event_detail.application_detail'),
      callback: () => {
        tabNavigation.navigate(BottomTabMenu.UserEvent, {
          tab: UserEventTabItem.PARTICIPANT,
        });
        resetQueries(resetQueryKeys.applyEvent);
      },
    });
  };

  const handleApplyError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text:
        error?.response?.data.message ??
        i18n.t('event_detail.application_failed'),
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
    if (isEmptyAnswer(qnaList)) {
      openDialog({
        type: 'validate',
        text: i18n.t('event_detail.input_additional_information'),
      });
      return;
    }
    await applyEvent({
      eventIndexId: params.idx,
      answerInfoList: convertToAnswerInfoArray(qnaList),
    });
  };

  return (
    <KeyboardAvoidingScreenLayout>
      {isApplying && (
        <WithIconLoading
          backgroundColor={colors.background}
          isActive
          text={i18n.t('event_detail.application_loading')}
        />
      )}

      {!event && <EventEmptyLayout />}

      {event && (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <EventDetail.TitleText title={event.title} color="main" />
            <SpaceLayout size={20}>
              <SpaceLayout size={10}>
                <EventDetail.DefaultSimpleList
                  title={i18n.t('date_time')}
                  description={dayjs(getEventDateByIndexId(params.idx)).format(
                    'YYYY.MM.DD(ddd) HH:mm',
                  )}
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
              <Divider height={1} color="darkGrey" />

              {/* 신청자 정보 */}
              <SpaceLayout size={15}>
                <Text style={eventApplyScreenStyles.subTitle}>
                  {i18n.t('event_detail.user_info')}
                </Text>

                <SpaceLayout size={10}>
                  <EventDetail.DefaultSimpleList
                    title={i18n.t('name')}
                    description={user?.userInfo.userName ?? ''}
                  />
                  <EventDetail.DefaultSimpleList
                    title={i18n.t('birth')}
                    description={
                      user?.userInfo
                        ? `${user.userInfo.birth.year}.${user.userInfo.birth.month}.${user.userInfo.birth.day}`
                        : ''
                    }
                  />
                  <EventDetail.DefaultSimpleList
                    title={i18n.t('gender')}
                    description={user?.userInfo.gender === 'MAN' ? '남' : '여'}
                  />
                </SpaceLayout>
              </SpaceLayout>

              {/* 추가 정보 */}
              {qnaList.length > 0 && (
                <>
                  <Divider height={1} color="darkGrey" />
                  <SpaceLayout size={15}>
                    <Text style={eventApplyScreenStyles.subTitle}>
                      {i18n.t('event_detail.additional_information')}
                    </Text>

                    <EventDetail.QuestionInput
                      qnaList={qnaList}
                      setQnaList={setQnaList}
                    />
                  </SpaceLayout>
                  {/* <Divider height={1} color="darkGrey" /> */}
                </>
              )}

              {/* TODO 개인정보 */}
              {/* <HeadText title={MENT_EVENT_DETAIL.MAIN.PERSONAL_INFORMATION} /> */}
              {/* <HeadText title={MENT_EVENT_DETAIL.MAIN.INSTRUCTIONS} /> */}
            </SpaceLayout>

            <Spacing height={200} />
          </ScrollView>

          <FixedButton
            label={i18n.t('event_detail.application')}
            onPress={handleApply}
          />
        </>
      )}
    </KeyboardAvoidingScreenLayout>
  );
};

export default EventApplyScreen;
