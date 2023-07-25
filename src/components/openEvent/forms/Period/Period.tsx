import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { serverDateFormatter } from 'utils/date';
import { HelpText } from 'components/openEvent/OpenEvent';
import StatusType from 'constants/status';
import periodStyles from './Period.style';

const Period = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();

  const [dates, setDates] = useState<Date[]>([]);
  const [newDate, setNewDate] = useState<Date>(new Date());

  const { eventDates } = openEventErrorMessage;
  const hasError = eventDates !== null;

  const addDate = (date: Date) => {
    if (hasError) {
      setOpenEventErrorMessage({ ...openEventErrorMessage, eventDates: null });
    }
    setDates([...dates, date]);
  };

  const removeDate = (index: number) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  useEffect(() => {
    const stringDates = dates.map((date) => serverDateFormatter(date));
    setOpenEvent({ ...openEvent, eventDates: stringDates });
  }, [dates]);

  return (
    <View>
      <OpenEvent.Label content="이벤트 일시" />

      <View style={periodStyles.inputContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={periodStyles.horizontalScrollView}
        >
          {dates.map((date, index) => (
            <OpenEvent.DateTimePicker
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              date={date}
              setDate={(newDateTime) => {
                const updatedDates = [...dates];
                updatedDates[index] = newDateTime;
                setDates(updatedDates);
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
            hasError={hasError}
          />
        </ScrollView>

        {hasError && (
          <HelpText status={StatusType.error} content={eventDates} />
        )}
      </View>
    </View>
  );
};

export default Period;
