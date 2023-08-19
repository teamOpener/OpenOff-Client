import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { StackMenu } from 'constants/menu';
import useNavigator from 'hooks/navigator/useNavigator';
import useDialog from 'hooks/app/useDialog';
import { useHostEventLists, useLedgerStatus } from 'hooks/queries/ledger';
import {
  DateSelector,
  DonutChartInfo,
  LargeIconButton,
  SmallIconButton,
} from 'components/userEvent/host';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import { EventDetailTabItem } from 'constants/eventDetail/eventDetailConstants';
import queryKeys from 'constants/queryKeys';
import { ConsoleScreenLayout } from 'components/userEvent/host/layout';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Spacing from 'components/common/Spacing/Spacing';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { EventIndexInfo } from 'models/ledger/entity/EventIndexInfo';
import { useSuspensionEvent } from 'hooks/queries/event';
import useStackRoute from 'hooks/navigator/useStackRoute';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { ApiErrorResponse } from 'types/ApiResponse';
import { colors } from 'styles/theme';
import hostConsoleStyles from './HostConsole.style';

const HostConsoleScreen = () => {
  const { stackNavigation } = useNavigator();
  const { params } = useStackRoute<StackMenu.HostConsole>();
  const { openDialog } = useDialog();
  const queryClient = useQueryClient();

  const { data: hostEventList } = useHostEventLists();
  const flatHostEventList = hostEventList?.pages.flatMap(
    (page) => page.data.content,
  );

  const getEventIndexList = (eventId: number): EventIndexInfo[] =>
    flatHostEventList
      ?.filter((event) => event.eventInfoId === eventId)
      .flatMap((event) => event.eventIndexInfoList) ?? [];

  const eventIndexList = getEventIndexList(params.eventId);
  const [selectedEventIndexInfo, setSelectedEventIndexInfo] =
    useState<EventIndexInfo>(eventIndexList[0]);

  const { data: eventStatus } = useLedgerStatus(
    selectedEventIndexInfo.eventIndexId,
  );

  /**
   * 이벤트 중단
   */

  const handleSuspenseSuccess = () => {
    queryClient.invalidateQueries(queryKeys.hostKeys.all);
    queryClient.invalidateQueries(queryKeys.eventKeys.byId(params.eventId));
    openDialog({
      type: 'success',
      text: MENT_HOST.SUCCESS.SUSPENSE_EVENT,
      closeText: '확인',
    });
  };

  const handleSuspenseError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
      closeText: '확인',
    });
  };

  const { mutateAsync: suspenseEvent, isLoading } = useSuspensionEvent(
    handleSuspenseSuccess,
    handleSuspenseError,
  );

  const handleStopApplication = () => {
    openDialog({
      type: 'warning',
      text: MENT_HOST.MAIN.SUSPENSE_EVENT,
      apply: () => {
        suspenseEvent({
          eventInfoId: params.eventId,
        });
      },
      applyText: '예',
      closeText: '아니오',
    });
  };

  /**
   * navigation
   */

  const handleNavigation = (
    screenName:
      | StackMenu.HostAlarm
      | StackMenu.HostQRScan
      | StackMenu.HostLedger,
  ) => {
    stackNavigation.navigate(screenName, {
      eventId: params.eventId,
      eventIndex: selectedEventIndexInfo.eventIndexId,
    });
  };

  const handleNavigationDetailPage = () => {
    stackNavigation.navigate('EventDetail', {
      id: params.eventId,
      tab: EventDetailTabItem.COMMENTS,
    });
  };

  /**
   * header
   */

  const headerRight = () => (
    <SmallIconButton
      iconName="IconCommentCircle"
      label={MENT_HOST.MAIN.COMMENT}
      onPress={handleNavigationDetailPage}
    />
  );

  useEffect(() => {
    stackNavigation.setOptions({
      headerRight,
    });
  }, []);

  if (!eventStatus) {
    return null;
  }

  return (
    <ConsoleScreenLayout>
      {isLoading && (
        <WithIconLoading isActive backgroundColor={colors.background} />
      )}
      <DateSelector
        eventIndexInfoList={eventIndexList}
        selectedEventIndexInfo={selectedEventIndexInfo}
        setSelectedEventIndexInfo={setSelectedEventIndexInfo}
      />

      <View style={hostConsoleStyles.chartContainer}>
        <DonutChartInfo
          numerator={eventStatus.approvedCount}
          denominator={eventStatus.maxCount}
          label={MENT_HOST.MAIN.APPROVED}
          color="lightGreen"
        />
        <DonutChartInfo
          numerator={eventStatus.joinedCount}
          denominator={eventStatus.maxCount}
          label={MENT_HOST.MAIN.ATTENDED}
          color="main"
        />
      </View>

      <View style={hostConsoleStyles.buttonContainer}>
        <SpaceLayout direction="row" size={0}>
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconQR"
            label={MENT_HOST.MAIN.QR_SCAN_BTN}
            onPress={() => handleNavigation(StackMenu.HostQRScan)}
          />
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconAddressBook"
            label={MENT_HOST.MAIN.LEDGER}
            onPress={() => handleNavigation(StackMenu.HostLedger)}
          />
        </SpaceLayout>
        <SpaceLayout direction="row" size={0}>
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconUserGear"
            label={MENT_HOST.MAIN.STAFF_MANAGEMENT}
            onPress={() => handleNavigation(StackMenu.HostAlarm)}
          />
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconStopCircle"
            label={MENT_HOST.MAIN.STOP_APPLICATION}
            onPress={handleStopApplication}
          />
        </SpaceLayout>
      </View>

      <Spacing height={80} />
      {eventStatus.isEnded && (
        <FixedButton disabled label={MENT_HOST.MAIN.ENDED} />
      )}

      {/* TODO 이벤트 개설 취소 api 생기면 추가 */}
      {/* {eventStatus.isEnded ? (
        <FixedButton disabled label={MENT_HOST.MAIN.ENDED} />
      ) : (
        <TextButton
          label={MENT_HOST.MAIN.CANCEL_BUTTON}
          onPress={handleCancelEvent}
        />
      )} */}
    </ConsoleScreenLayout>
  );
};

export default HostConsoleScreen;
