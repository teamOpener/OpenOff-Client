import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
import { View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import openEventFormStyles from '../OpenEventForm.style';

const HostPhoneNumber = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { hostPhoneNumber } = openEvent;
  const { hostPhoneNumber: errMsg } = openEventErrorMessage;

  const handleChangeText = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '');

    setOpenEvent({ ...openEvent, hostPhoneNumber: numbersOnly });
    setOpenEventErrorMessage({
      ...openEventErrorMessage,
      hostPhoneNumber: null,
    });
  };

  return (
    <View>
      <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.HOST_PHONE} />
      <View style={openEventFormStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder={MENT_OPEN_EVENT.PLACEHOLDER.HOST_PHONE}
          status={errMsg ? StatusType.error : StatusType.default}
          value={hostPhoneNumber ?? ''}
          onChangeText={handleChangeText}
          keyboardType="numeric"
        />
        {!!errMsg && (
          <HelpText status={StatusType.error} content={errMsg ?? ''} />
        )}
      </View>
    </View>
  );
};

export default HostPhoneNumber;
