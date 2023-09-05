import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { serverDateFormatter } from 'utils/date';
import periodStyles from './Period.style';

const Period = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { eventDates } = openEvent;
  const { eventDates: hasError } = openEventErrorMessage;

  const [newDate, setNewDate] = useState<Date>(new Date());

  const addDate = (date: Date) => {
    if (hasError) {
      setOpenEventErrorMessage({ ...openEventErrorMessage, eventDates: null });
    }
    const newDateArray = [...eventDates, serverDateFormatter(date)];

    setOpenEvent({ ...openEvent, eventDates: newDateArray });
  };

  const removeDate = (index: number) => {
    const updatedDates = [...eventDates];
    updatedDates.splice(index, 1);
    setOpenEvent({ ...openEvent, eventDates: updatedDates });
  };

  return (
    <View>
      <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.PERIOD} />

      <View style={periodStyles.inputContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={periodStyles.horizontalScrollView}
        >
          {eventDates.map((date, index) => (
            <OpenEvent.DateTimePicker
              key={index}
              date={new Date(date)}
              setDate={(newDateTime) => {
                const updatedDates = [...eventDates];
                updatedDates[index] = serverDateFormatter(newDateTime);
                setOpenEvent({ ...openEvent, eventDates: updatedDates });
              }}
              deletePossible
              onDelete={() => removeDate(index)}
            />
          ))}
          <OpenEvent.DateTimePicker
            date={newDate}
            setDate={(d) => {
              setNewDate(d);
            }}
            onAdd={addDate}
            isEmpty
            hasError={hasError !== null}
          />
        </ScrollView>

        {hasError && (
          <HelpText status={StatusType.error} content={hasError ?? ''} />
        )}
      </View>
    </View>
  );
};

export default Period;
