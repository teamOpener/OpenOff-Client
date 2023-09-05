import { OpenEvent } from 'components/openEvent';
import StatusType from 'constants/app/status';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
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
      <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.TITLE} />
      <OpenEvent.Input
        value={title ?? ''}
        onChangeText={handleChangeText}
        placeholder={MENT_OPEN_EVENT.PLACEHOLDER.TITLE}
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
