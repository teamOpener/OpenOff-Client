import MENT_OPEN_EVENT from 'constants/openEvent';
import { initEventBuilderErrMsg } from 'stores/OpenEventStore';
import { EventBuilder } from 'types/openEvent/EventBuilder';
import { EventBuilderError } from 'types/openEvent/EventBuilderError';

interface Props {
  openEvent: EventBuilder;
}

const useOpenEventValidator = ({ openEvent }: Props) => {
  let errorMessage: EventBuilderError = initEventBuilderErrMsg;
  let hasError = false;

  const setError = (field: keyof EventBuilderError, message: string) => {
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

  if (!openEvent.address.roadAddress) {
    setError('address', MENT_OPEN_EVENT.ERROR.ADDRESS);
  }

  if (!openEvent.recruitmentNumber) {
    setError('recruitmentNumber', MENT_OPEN_EVENT.ERROR.RECRUITMENT);
  }

  if (!openEvent.description) {
    setError('description', MENT_OPEN_EVENT.ERROR.DESCRIPTION);
  }

  if (!openEvent.imageBuilders.length) {
    setError('imageUrls', MENT_OPEN_EVENT.HELP_TEXT.IMAGE);
  }

  if (!openEvent.hostName) {
    setError('hostName', MENT_OPEN_EVENT.ERROR.HOST_NAME);
  }

  if (!openEvent.hostPhoneNumber) {
    setError('hostPhoneNumber', MENT_OPEN_EVENT.ERROR.HOST_PHONE);
  }

  if (!openEvent.hostEmail) {
    setError('hostEmail', MENT_OPEN_EVENT.ERROR.HOST_EMAIL);
  }

  return { hasError, errorMessage };
};

export default useOpenEventValidator;
