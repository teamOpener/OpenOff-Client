import MENT_OPEN_EVENT from 'constants/openEvent';
import {
  CreateEventDto,
  OpenEventErrorMessage,
  initOpenEventErrorMessage,
} from 'stores/OpenEventStore';

interface Props {
  openEvent: CreateEventDto;
}

const useOpenEventValidator = ({ openEvent }: Props) => {
  let errorMessage: OpenEventErrorMessage = initOpenEventErrorMessage;
  let hasError = false;

  const setError = (field: keyof OpenEventErrorMessage, message: string) => {
    hasError = true;
    errorMessage = { ...errorMessage, [field]: message };
  };

  if (!openEvent.field.length) {
    setError('field', MENT_OPEN_EVENT.ERROR_FIELD);
  }

  if (!openEvent.title) {
    setError('title', MENT_OPEN_EVENT.ERROR_TITLE);
  }

  if (!openEvent.applicationStartDate || !openEvent.applicationEndDate) {
    setError('applicationPeriod', MENT_OPEN_EVENT.ERROR_APPLICATION_DATE);
  }

  if (!openEvent.eventDates.length) {
    setError('eventDates', MENT_OPEN_EVENT.ERROR_DATE);
  }

  return { hasError, errorMessage };
};

export default useOpenEventValidator;
