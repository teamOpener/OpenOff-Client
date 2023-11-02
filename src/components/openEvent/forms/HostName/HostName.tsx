import i18n from 'locales';
import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
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
      <OpenEvent.Label content={i18n.t('host_name')} />
      <View style={openEventFormStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder={i18n.t('host_name_input')}
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
