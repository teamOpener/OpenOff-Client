import { OpenEvent } from 'components/openEvent';
import StatusType from 'constants/app/status';
import i18n from 'locales';
import { View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';

const Title = () => {
  const {
    openEvent,
    openEventErrorMessage,
    setOpenEvent,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { title } = openEvent;
  const { title: errMsg } = openEventErrorMessage;

  const handleChangeText = (value: string) => {
    setOpenEvent({ ...openEvent, title: value });
    setOpenEventErrorMessage({
      ...openEventErrorMessage,
      title: null,
    });
  };

  return (
    <View>
      <OpenEvent.Label content={i18n.t('event_title')} />
      <OpenEvent.Input
        value={title ?? ''}
        onChangeText={handleChangeText}
        placeholder={i18n.t('title')}
        status={
          openEventErrorMessage.title == null
            ? StatusType.default
            : StatusType.error
        }
        helpText={errMsg ?? undefined}
      />
    </View>
  );
};

export default Title;
