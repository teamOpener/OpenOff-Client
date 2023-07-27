import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import Spacing from 'components/common/Spacing/Spacing';
import MENT_OPEN_EVENT from 'constants/openEvent';
import StatusType from 'constants/status';
import { Field as FieldType } from 'types/apps/group';
import fieldData from 'data/lists/fieldData';
import { useOpenEventStore } from 'stores/OpenEventStore';
import useField from 'hooks/openEvent/useField';

const Field = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();

  const [eventField, setEventField] = useState<FieldType[]>(fieldData);
  const { toggleFieldIsActive, getActiveFieldCodes } = useField({
    eventField,
  });

  const handlePress = (f: FieldType): void => {
    const updatedFields = toggleFieldIsActive(eventField, f);
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
