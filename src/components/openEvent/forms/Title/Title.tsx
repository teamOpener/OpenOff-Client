import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import { useOpenEventStore } from 'stores/OpenEventStore';
import StatusType from 'constants/status';

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
      <OpenEvent.Label content="이벤트 제목" />
      <OpenEvent.Input
        value={title ?? ''}
        onChangeText={handleChangeText}
        placeholder="제목"
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
