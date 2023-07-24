import { useEffect, useState } from 'react';
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

  const [title, onChangeTitle] = useState<string>('');

  useEffect(() => {
    if (title === '') {
      setOpenEvent({
        ...openEvent,
        title: null,
      });
      return;
    }

    if (openEventErrorMessage.title !== null) {
      setOpenEventErrorMessage({ ...openEventErrorMessage, title: null });
    }

    setOpenEvent({ ...openEvent, title });
  }, [title]);

  return (
    <View>
      <OpenEvent.Label content="이벤트 제목" />
      <OpenEvent.Input
        value={title}
        onChangeText={onChangeTitle}
        placeholder="제목"
        status={
          openEventErrorMessage.title == null
            ? StatusType.default
            : StatusType.error
        }
        helpText={openEventErrorMessage.title ?? undefined}
      />
    </View>
  );
};

export default Title;
