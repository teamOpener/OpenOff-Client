import i18n from 'locales';
import { useQueryClient } from '@tanstack/react-query';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Spacing from 'components/common/Spacing/Spacing';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import {
  DateSelector,
  DonutChartInfo,
  LargeIconButton,
  SmallIconButton,
} from 'components/userEvent/host';
import { ConsoleScreenLayout } from 'components/userEvent/host/layout';
import { StackMenu } from 'constants/app/menu';
import { EventDetailTabItem } from 'constants/eventDetail/eventDetailConstants';
import queryKeys from 'constants/queries/queryKeys';
import useDialog from 'hooks/app/useDialog';
import useNavigator from 'hooks/navigator/useNavigator';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useSuspensionEvent } from 'hooks/queries/event';
import { useHostEventLists, useLedgerStatus } from 'hooks/queries/ledger';
import { EventIndexInfo } from 'models/ledger/entity/EventIndexInfo';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
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
    queryClient.invalidateQueries(queryKeys.eventKeys.details);
    openDialog({
      type: 'success',
      text: i18n.t('suspense_event_message'),
      closeText: i18n.t('confirm'),
    });
  };

  const handleSuspenseError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? i18n.t('default_error_message'),
      closeText: i18n.t('confirm'),
    });
  };

  const { mutateAsync: suspenseEvent, isLoading } = useSuspensionEvent(
    handleSuspenseSuccess,
    handleSuspenseError,
  );

  const handleStopApplication = () => {
    openDialog({
      type: 'warning',
      text: i18n.t('suspense_event'),
      apply: () => {
        suspenseEvent({
          eventInfoId: params.eventId,
        });
      },
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
    });
  };

  /**
   * navigation
   */

  const handleNavigation = (
    screenName:
      | StackMenu.StaffManagement
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
      label={i18n.t('comment')}
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
          label={i18n.t('approved')}
          color="lightGreen"
        />
        <DonutChartInfo
          numerator={eventStatus.joinedCount}
          denominator={eventStatus.maxCount}
          label={i18n.t('attended')}
          color="main"
        />
      </View>

      <View style={hostConsoleStyles.buttonContainer}>
        <SpaceLayout direction="row" size={0}>
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconQR"
            label={i18n.t('qr_scan_btn')}
            onPress={() => handleNavigation(StackMenu.HostQRScan)}
          />
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconAddressBook"
            label={i18n.t('ledger')}
            onPress={() => handleNavigation(StackMenu.HostLedger)}
          />
        </SpaceLayout>
        <SpaceLayout direction="row" size={0}>
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconUserGear"
            label={i18n.t('staff_management')}
            onPress={() => handleNavigation(StackMenu.StaffManagement)}
          />
          <LargeIconButton
            disabled={eventStatus.isEnded}
            iconName="IconStopCircle"
            label={i18n.t('stop_application')}
            onPress={handleStopApplication}
          />
        </SpaceLayout>
      </View>

      <Spacing height={80} />
      {eventStatus.isEnded && <FixedButton disabled label={i18n.t('ended')} />}

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
