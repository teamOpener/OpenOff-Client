import Text from 'components/common/Text/Text';
import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { serverDateFormatter } from 'utils/date';
import applicationPeriodStyles from './ApplicationPeriod.style';

const ApplicationPeriod = () => {
  const {
    openEvent,
    openEventErrorMessage,
    setOpenEvent,
    setOpenEventErrorMessage,
  } = useOpenEventStore();

  const [startDate, setStartDate] = useState<Date>(
    openEvent.applicationStartDate === null
      ? new Date()
      : new Date(openEvent.applicationStartDate),
  );
  const [endDate, setEndDate] = useState<Date>(
    openEvent.applicationEndDate === null
      ? new Date()
      : new Date(openEvent.applicationEndDate),
  );

  const hasError = openEventErrorMessage.applicationPeriod !== null;

  useEffect(() => {
    if (hasError) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        applicationPeriod: null,
      });
    }

    setOpenEvent({
      ...openEvent,
      applicationStartDate: serverDateFormatter(startDate),
    });
  }, [startDate]);

  useEffect(() => {
    if (hasError) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        applicationPeriod: null,
      });
    }

    setOpenEvent({
      ...openEvent,
      applicationEndDate: serverDateFormatter(endDate),
    });
  }, [endDate]);

  return (
    <View>
      <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.APPLICATION_PERIOD} />

      <View style={applicationPeriodStyles.inputContainer}>
        <ScrollView
          horizontal
          style={applicationPeriodStyles.dateTimePickerContainer}
          contentContainerStyle={
            applicationPeriodStyles.dateTimePickerContentContainer
          }
        >
          <View style={applicationPeriodStyles.dateTimePickerWrapper}>
            <OpenEvent.DateTimePicker
              date={startDate}
              setDate={setStartDate}
              isEmpty={openEvent.applicationStartDate === null}
              hasError={hasError}
            />
            <Text style={applicationPeriodStyles.text}>
              {MENT_OPEN_EVENT.MAIN.TO}
            </Text>
          </View>

          <View style={applicationPeriodStyles.dateTimePickerWrapper}>
            <OpenEvent.DateTimePicker
              date={endDate}
              setDate={setEndDate}
              disabled={openEvent.applicationStartDate === null}
              isEmpty={openEvent.applicationEndDate === null}
              minimumDate={startDate}
              hasError={hasError}
            />
            <Text style={applicationPeriodStyles.text}>
              {MENT_OPEN_EVENT.MAIN.FROM}
            </Text>
          </View>
        </ScrollView>

        {hasError && (
          <HelpText
            status={StatusType.error}
            content={openEventErrorMessage.applicationPeriod ?? ''}
          />
        )}
      </View>
    </View>
  );
};

export default ApplicationPeriod;
