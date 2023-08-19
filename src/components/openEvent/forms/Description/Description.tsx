import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import { useOpenEventStore } from 'stores/OpenEventStore';
import StatusType from 'constants/status';
import { HelpText } from 'components/openEvent/atoms';
import descriptionStyles from './Description.style';

const Description = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { description } = openEvent;
  const { description: errMsg } = openEventErrorMessage;

  const handleChangeText = (value: string) => {
    setOpenEvent({ ...openEvent, description: value });
    setOpenEventErrorMessage({
      ...openEventErrorMessage,
      description: null,
    });
  };

  return (
    <View>
      <OpenEvent.Label content="이벤트 상세 내용" />

      <View style={descriptionStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder={MENT_OPEN_EVENT.PLACEHOLDER.DESCRIPTION}
          editable
          multiline
          style={descriptionStyles.input}
          value={description ?? ''}
          onChangeText={handleChangeText}
          status={errMsg ? StatusType.error : StatusType.default}
        />
        {!!errMsg && (
          <HelpText
            status={StatusType.error}
            content={openEventErrorMessage.description ?? ''}
          />
        )}
      </View>
    </View>
  );
};

export default Description;
