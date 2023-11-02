import i18n from 'locales';
import Text from 'components/common/Text/Text';
import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
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
      <OpenEvent.Label content={i18n.t('application_period')} />

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
            <Text style={applicationPeriodStyles.text}>{i18n.t('to')}</Text>
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
            <Text style={applicationPeriodStyles.text}>{i18n.t('from')}</Text>
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
