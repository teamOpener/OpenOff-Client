import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
import { View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import openEventFormStyles from '../OpenEventForm.style';

const HostEmail = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { hostEmail } = openEvent;
  const { hostEmail: errMsg } = openEventErrorMessage;

  const handleChangeText = (value: string) => {
    // TODO: 유효셩 검증
    setOpenEvent({ ...openEvent, hostEmail: value });
    setOpenEventErrorMessage({
      ...openEventErrorMessage,
      hostEmail: null,
    });
  };

  return (
    <View>
      <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.HOST_EMAIL} />
      <View style={openEventFormStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder={MENT_OPEN_EVENT.PLACEHOLDER.HOST_EMAIL}
          status={errMsg ? StatusType.error : StatusType.default}
          value={hostEmail ?? ''}
          onChangeText={handleChangeText}
        />
        {!!errMsg && (
          <HelpText status={StatusType.error} content={errMsg ?? ''} />
        )}
      </View>
    </View>
  );
};

export default HostEmail;
