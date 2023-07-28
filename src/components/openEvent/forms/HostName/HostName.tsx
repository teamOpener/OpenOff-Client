import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import MENT_OPEN_EVENT from 'constants/openEvent';
import StatusType from 'constants/status';
import { View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import openEventFormStyles from '../OpenEventForm.style';

const HostName = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { hostName } = openEvent;
  const { hostName: errMsg } = openEventErrorMessage;

  const handleChangeText = (value: string) => {
    setOpenEvent({ ...openEvent, hostName: value });
    setOpenEventErrorMessage({ ...openEventErrorMessage, hostName: null });
  };

  return (
    <View>
      <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.HOST_NAME} />
      <View style={openEventFormStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder={MENT_OPEN_EVENT.ERROR.HOST_NAME}
          status={errMsg ? StatusType.error : StatusType.default}
          value={hostName ?? ''}
          onChangeText={handleChangeText}
        />
        {!!errMsg && (
          <HelpText status={StatusType.error} content={errMsg ?? ''} />
        )}
      </View>
    </View>
  );
};

export default HostName;
