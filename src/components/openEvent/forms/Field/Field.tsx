import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import Spacing from 'components/common/Spacing/Spacing';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import StatusType from 'constants/status';
import { Field as FieldType } from 'types/interest';
import { useOpenEventStore } from 'stores/OpenEventStore';
import useField from 'hooks/openEvent/useField';
import useInterestFields from 'hooks/interest/useInterestFields';

const Field = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();

  const { generateInterestFieldTags } = useInterestFields();

  const [eventField, setEventField] = useState<FieldType[]>(
    generateInterestFieldTags(),
  );
  const { toggleFieldIsActive, getActiveFieldCodes } = useField({
    eventField,
  });

  /**
   * 최대 3개까지 선택 가능합니다.
   */
  const handlePress = (field: FieldType): void => {
    if (!field.isActive && getActiveFieldCodes().length === 3) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        field: MENT_OPEN_EVENT.ERROR.MAX_FIELD,
      });
      return;
    }

    const updatedFields = toggleFieldIsActive(eventField, field);
    setEventField(updatedFields);
    setOpenEventErrorMessage({ ...openEventErrorMessage, field: null });
  };

  useEffect(() => {
    setOpenEvent({ ...openEvent, field: getActiveFieldCodes() });
  }, [eventField]);

  return (
    <View>
      <OpenEvent.Label content="이벤트 분야" />
      <OpenEvent.HelpText
        content={
          openEventErrorMessage.field === null
            ? MENT_OPEN_EVENT.FIELD_HELP_TEXT
            : openEventErrorMessage.field
        }
        status={
          openEventErrorMessage.field === null
            ? StatusType.default
            : StatusType.error
        }
      />
      <Spacing height={15} />

      <OpenEvent.TagGroup>
        {eventField.map((f) => (
          <OpenEvent.Tag
            key={f.value}
            label={f.label}
            isSelected={f.isActive}
            onPress={() => handlePress(f)}
          />
        ))}
      </OpenEvent.TagGroup>
    </View>
  );
};

export default Field;
