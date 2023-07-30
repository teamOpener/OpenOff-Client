import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Text from 'components/common/Text/Text';
import { OpenEvent } from 'components/openEvent';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { serverDateFormatter } from 'utils/date';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/status';
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
      <OpenEvent.Label content="이벤트 신청 기간" />

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
            <Text>부터</Text>
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
            <Text>까지</Text>
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
