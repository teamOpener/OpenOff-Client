import { OpenEvent } from 'components/openEvent';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/status';
import recruitmentNumberStyles from './RecruitmentNumber.style';

const RecruitmentNumber = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const hasError = !!openEventErrorMessage.recruitmentNumber;

  const [maxParticipant, setMaxParticipant] = useState<string>('');

  const handleChangeText = (value: string) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return;
    }
    if (numericValue === 0) {
      setMaxParticipant('');
      return;
    }
    setMaxParticipant(numericValue.toString());
  };

  useEffect(() => {
    if (hasError) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        recruitmentNumber: null,
      });
    }

    const numericValue = Number(maxParticipant);

    if (!numericValue) {
      setOpenEvent({ ...openEvent, recruitmentNumber: null });
    }
    setOpenEvent({ ...openEvent, recruitmentNumber: numericValue });
  }, [maxParticipant]);

  return (
    <View>
      <OpenEvent.Label content="모집 인원" />

      <View style={recruitmentNumberStyles.inputWithHelpText}>
        <OpenEvent.Input
          placeholder="80"
          style={recruitmentNumberStyles.input}
          keyboardType="numeric"
          value={maxParticipant}
          onChangeText={handleChangeText}
        />

        {hasError && (
          <HelpText
            status={StatusType.error}
            content={openEventErrorMessage.recruitmentNumber ?? ''}
          />
        )}
      </View>
    </View>
  );
};

export default RecruitmentNumber;
