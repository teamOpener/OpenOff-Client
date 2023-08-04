import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackMenu } from 'constants/menu';
import useNavigator from 'hooks/navigator/useNavigator';
import useRouteParams from 'hooks/navigator/useRouteParams';
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
import hostConsoleStyles from './HostConsole.style';

const HostConsoleScreen = () => {
  const { stackNavigation } = useNavigator();
  const params = useRouteParams<StackMenu.HostConsole>();
  // TODO 수정
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [eventIndex, setEventIndex] = useState<number>(0);

  const headerRight = () => (
    <SmallIconButton
      iconName="IconCommentCircle"
      label={MENT_HOST.MAIN.COMMENT}
      onPress={() => {
        // TODO
        // stackNavigation.navigate('')
      }}
    />
  );

  const handlePressQR = () => {
    if (!params?.eventId) return;
    stackNavigation.navigate('HostQRScan', {
      eventId: params.eventId,
      eventIndex,
    });
  };

  const handlePressLedger = () => {
    if (!params?.eventId) return;
    stackNavigation.navigate('HostQRScan', {
      eventId: params.eventId,
      eventIndex,
    });
  };

  const handlePressAlarm = () => {
    if (!params?.eventId) return;
    stackNavigation.navigate('HostQRScan', {
      eventId: params.eventId,
      eventIndex,
    });
  };

  const handleStopApplication = () => {
    // TODO
  };

  useEffect(() => {
    stackNavigation.setOptions({
      headerRight,
    });
  }, []);

  return (
    <ConsoleScreenLayout>
      <DateSelector />

      <View style={hostConsoleStyles.chartContainer}>
        <DonutChartInfo
          numerator={63}
          denominator={100}
          label={MENT_HOST.MAIN.APPROVED}
          color="lightGreen"
        />
        <DonutChartInfo
          numerator={10}
          denominator={100}
          label={MENT_HOST.MAIN.ATTENDED}
          color="main"
        />
      </View>

      <View style={hostConsoleStyles.buttonContainer}>
        <SpaceLayout direction="row" size={0}>
          <LargeIconButton
            disabled={isEnded}
            iconName="IconQR"
            label={MENT_HOST.MAIN.QR_SCAN_BTN}
            onPress={handlePressQR}
          />
          <LargeIconButton
            disabled={isEnded}
            iconName="IconPeople"
            label={MENT_HOST.MAIN.LEDGER}
            onPress={handlePressLedger}
          />
        </SpaceLayout>
        <SpaceLayout direction="row" size={0}>
          <LargeIconButton
            disabled={isEnded}
            iconName="IconBellLing"
            label={MENT_HOST.MAIN.ALARM}
            onPress={handlePressAlarm}
          />
          <LargeIconButton
            disabled={isEnded}
            iconName="IconStopCircle"
            label={MENT_HOST.MAIN.STOP_APPLICATION}
            onPress={handleStopApplication}
          />
        </SpaceLayout>
      </View>

      <Spacing height={80} />
      {isEnded && <FixedButton disabled label={MENT_HOST.MAIN.ENDED} />}
    </ConsoleScreenLayout>
  );
};

export default HostConsoleScreen;
