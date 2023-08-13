import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackMenu } from 'constants/menu';
import useNavigator from 'hooks/navigator/useNavigator';
import useRouteParams from 'hooks/navigator/useRouteParams';
import { useHostEventLists, useLedgerStatus } from 'hooks/queries/ledger';
import {
  DateSelector,
  DonutChartInfo,
  LargeIconButton,
  SmallIconButton,
} from 'components/userEvent/host';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import { ConsoleScreenLayout } from 'components/userEvent/host/layout';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Spacing from 'components/common/Spacing/Spacing';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { EventIndexInfo } from 'models/ledger/entity/EventIndexInfo';
import hostConsoleStyles from './HostConsole.style';

const HostConsoleScreen = () => {
  const { stackNavigation } = useNavigator();
  const params = useRouteParams<StackMenu.HostConsole>();

  const { data: hostEventList } = useHostEventLists();
  const flatHostEventList = hostEventList?.pages.flatMap(
    (page) => page.data.content,
  );

  const getEventIndexList = (eventId?: number) =>
    flatHostEventList
      ?.filter((event) => event.eventInfoId === eventId)
      .flatMap((event) => event.eventIndexInfoList);

  const eventIndexList = getEventIndexList(params?.eventId);
  const [selectedEventIndexInfo, setSelectedEventIndexInfo] = useState<
    EventIndexInfo | undefined
  >(eventIndexList?.[0]);

  const { data: eventStatus } = useLedgerStatus(
    selectedEventIndexInfo?.eventIndexId ?? 0,
  );

  const handleNavigation = (
    screenName:
      | StackMenu.HostAlarm
      | StackMenu.HostQRScan
      | StackMenu.HostLedger,
  ) => {
    if (!params?.eventId || !selectedEventIndexInfo?.eventIndexId) {
      return;
    }
    stackNavigation.navigate(screenName, {
      eventId: params.eventId,
      eventIndex: selectedEventIndexInfo.eventIndexId,
    });
  };

  const handleNavigationDetailPage = () => {
    if (!params?.eventId) {
      return;
    }
    stackNavigation.navigate('EventDetail', {
      id: params.eventId,
    });
  };

  const headerRight = () => (
    <SmallIconButton
      iconName="IconCommentCircle"
      label={MENT_HOST.MAIN.COMMENT}
      onPress={handleNavigationDetailPage}
    />
  );

  const handleStopApplication = () => {
    // TODO
  };

  useEffect(() => {
    stackNavigation.setOptions({
      headerRight,
    });
  }, []);

  // TODO loading

  if (!eventStatus || !eventIndexList || !selectedEventIndexInfo) {
    return null;
  }

  return (
    <ConsoleScreenLayout>
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
            disabled={eventStatus.isClosed}
            iconName="IconQR"
            label={MENT_HOST.MAIN.QR_SCAN_BTN}
            onPress={() => handleNavigation(StackMenu.HostQRScan)}
          />
          <LargeIconButton
            disabled={eventStatus.isClosed}
            iconName="IconPeople"
            label={MENT_HOST.MAIN.LEDGER}
            onPress={() => handleNavigation(StackMenu.HostLedger)}
          />
        </SpaceLayout>
        <SpaceLayout direction="row" size={0}>
          <LargeIconButton
            disabled={eventStatus.isClosed}
            iconName="IconBellLing"
            label={MENT_HOST.MAIN.ALARM}
            onPress={() => handleNavigation(StackMenu.HostAlarm)}
          />
          <LargeIconButton
            disabled={eventStatus.isClosed}
            iconName="IconStopCircle"
            label={MENT_HOST.MAIN.STOP_APPLICATION}
            onPress={handleStopApplication}
          />
        </SpaceLayout>
      </View>

      <Spacing height={80} />
      {eventStatus.isClosed && (
        <FixedButton disabled label={MENT_HOST.MAIN.ENDED} />
      )}
    </ConsoleScreenLayout>
  );
};

export default HostConsoleScreen;
