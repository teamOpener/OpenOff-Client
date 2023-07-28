import { View } from 'react-native';
import { debounce } from 'lodash';
import { OpenEvent } from 'components/openEvent';
import MENT_OPEN_EVENT from 'constants/openEvent';
import { useCallback, useEffect, useState } from 'react';
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
  const hasError = !!openEventErrorMessage.description;

  const [content, setContent] = useState<string>('');

  const handleContent = useCallback(
    debounce((value) => {
      setOpenEvent({
        ...openEvent,
        description: value,
      });
    }, 500),
    [],
  );

  useEffect(() => {
    if (hasError) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        description: null,
      });
    }

    handleContent(content);
  }, [content]);

  return (
    <View>
      <OpenEvent.Label content="이벤트 상세 내용" />

      <View style={descriptionStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder={MENT_OPEN_EVENT.PLACEHOLDER.DESCRIPTION}
          editable
          multiline
          style={descriptionStyles.input}
          value={content}
          onChangeText={setContent}
          status={hasError ? StatusType.error : StatusType.default}
        />
        {hasError && (
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
