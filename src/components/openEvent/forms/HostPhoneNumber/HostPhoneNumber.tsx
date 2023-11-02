import i18n from 'locales';
import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
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
      <OpenEvent.Label content={i18n.t('host_phone')} />
      <View style={openEventFormStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder={i18n.t('host_name_input')}
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
